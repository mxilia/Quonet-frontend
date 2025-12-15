'use client';

import { path } from "@/config/path";
import { useUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LoginLayoutProps = {
  children: React.ReactNode;
}

export const LoginLayout = ({ children } : LoginLayoutProps) => {

  const { data: user, isLoading, error } = useUser();

  if(isLoading) return <div>loading..</div>;

  const router = useRouter();
  useEffect(() => {
    if(user) router.push(path.home.getHref());
  }, [user, router]);

  return ( <>{ children }</> )
}