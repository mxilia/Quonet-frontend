import { env } from "@/config/env";

export const path = {
  home: {
    getHref: () => '/',
  },

  auth: {
    oauth: {
      getHref: () => `${env.API_URL}/auth/google/login`,
    }
  },

  public: {
    login: {
      getHref: () => '/login',
    },
    thread: {
      getHref: (id : string) => `/threads/${id}`,
    },
    post: {
      getHref: (id : string) => `/posts/${id}`
    },
    user: {
      getHref: (id : string) => `/users/${id}`
    },
    terms: {
      getHref: () => '/term-of-service'
    },
    about: {
      getHref: () => '/about-us'
    },
    feed: {
      getHref: () => '/feed'
    },
  },
  private: {
    settings: {
      getHref: () => '/settings'
    },
  },
  admin: {
    dashboard: {
      getHref: () => '/admin/dashboard'
    },
  }
}