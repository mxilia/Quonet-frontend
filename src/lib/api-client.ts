import { env } from '@/config/env';
import { redirect } from 'next/navigation';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

function buildUrlWithParams(url: string, params?: RequestOptions['params']) : string {
  if(!params) return url;

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );

  if(Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString();
  
  return `${url}?${queryString}`;
}

export async function getServerCookies() : Promise<string> {
  // True if client, False if server
  if (typeof window !== 'undefined') return '';

  try {
    // Dynamic import next/headers only on server-side
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    
    return cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');
  } catch(error) {
    console.error('Failed to access cookies:', error);
    return '';
  }
}

export function setSessionStorageItem(key : string, value : string) {
  if(typeof window === 'undefined') return;
  sessionStorage.setItem(key, value);
  return;
}

async function fetchApi<T>(url: string, options: RequestOptions = {}) : Promise<T> {
  const { method = 'GET', headers = {}, body, cookie, params, cache = 'no-store', next } = options;

  // Get cookies from the request when running on server
  let cookieHeader = cookie;
  if(typeof window === 'undefined' && !cookie){
    cookieHeader = await getServerCookies();
  }

  let token = '';
  if(typeof window !== 'undefined'){
    token = sessionStorage.getItem('access_token') ?? '';
  }

  const fullUrl = buildUrlWithParams(`${env.API_URL}${url}`, params);

  let fetchConfig: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    cache,
    next,
  }

  let response = await fetch(fullUrl, fetchConfig);

  if(response.status === 401){
    const refresh = await fetch(buildUrlWithParams(`${env.API_URL}/auth/refresh`, {}),{
      method: 'POST',
      credentials: 'include',
    });

    if(!refresh.ok){
      // Will implement maybe redirect n clearing sessions
      const data = await refresh.json()
      redirect(`/${data?.message}`);
    }

    const data = await refresh.json()
    setSessionStorageItem('access_token', data.access_token);

    fetchConfig.headers = {
      ...(fetchConfig.headers as Record<string, string>),
      Authorization: `Bearer ${data.access_token}`,
    };    

    response = await fetch(fullUrl, fetchConfig);
  }

  if(!response.ok){
    const message = (await response.json()).message || response.statusText;
    if(typeof window !== 'undefined'){
      /*
      Will implement by myself later.
      useNotifications.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });
      */
    }
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'GET' });
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'POST', body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'PUT', body });
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'PATCH', body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: 'DELETE' });
  },
}