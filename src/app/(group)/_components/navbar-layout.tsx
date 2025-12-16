'use client';

import { path } from "@/config/path";
import { useUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children } : { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useUser();
  if(isLoading) return <div>is loading</div>
  return (
    <>
      <nav className="flex items-center h-17 bg-black fixed w-full pl-50 pr-10 text-white border-b border-b-(--foreground)">
        <div className="text-2xl text-white mr-10"> Quonet </div>
        <input placeholder="Search?" className="bg-neutral-600 w-150 h-8 mr-10 rounded-xl text-white pl-4 pr-4"/>
        <Link href={path.home.getHref()}>
          <div className="mr-10">home</div>
        </Link>
        <Link href={path.public.feed.getHref()}>
          <div className="mr-10">feed</div>
        </Link>
        <Link href={path.private.settings.getHref()}>
          <div className="mr-10">settings</div>
        </Link>
        <div className="inline-flex items-center gap-3">
          {
            user ?
              <>
                <Image src={user?.profile_url ? user.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="rounded-full border bg-white" />
                <div className="text-neutral-300">{user?.handler}</div>
              </>
            :
            <Link href={path.public.login.getHref()}><button>login</button></Link>
          }
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