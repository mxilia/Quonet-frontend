'use client';

import { useUser } from "@/lib/auth";
import Image from "next/image";

const Layout = ({ children } : { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useUser();
  if(isLoading) return <div>is loading</div>
  return (
    <>
      <nav className="flex items-center h-17 bg-neutral-800 fixed w-full pl-5 pr-10 justify-between">
        <div className="text-2xl text-white"> Quonet </div>
        <div className="inline-flex items-center gap-2">
          <div className="border rounded-4xl w-8 h-8 flex items-center justify-center bg-blue-100">
            <Image src={ user?.profile_url ? user.profile_url : "/default-avatar.png"} height={20} width={20} alt="user profile"/>
          </div>
          <div className="text-lg text-neutral-300">{ user?.handler }</div>
        </div>
      </nav>
      { children }
    </>
  )
}

export const NavbarLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <>
      <Layout>{ children }</Layout>
    </>
  )
}