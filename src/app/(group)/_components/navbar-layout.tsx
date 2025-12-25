'use client';

import { path } from "@/config/path";
import { useUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children } : { children: React.ReactNode }) => {
  const { data: user, isLoading, error } = useUser();
  if(isLoading) return <div>is loading</div>;
  return (
    <>
      <nav className="z-50 flex items-center h-17 bg-black/30 backdrop-blur-lg fixed w-full pr-10 text-white border-b border-b-(--foreground) pl-48">
        <Link href={path.home.getHref()}>
          <Image src="/logo.svg" alt="quonet's logo" width={134} height={50} className="w-50 h-20 max-w-50 max-h-20 min-w-50 pb-2 hover:blur-xs transition-all" />
        </Link>
        <input placeholder="Search?" className="bg-(--darker-foreground) text-sm w-150 h-7 mr-10 rounded-lg text-white p-2 pl-4 pr-4"/>
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
                <Image src={user?.profile_url ? user.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="rounded-full border border-(--foreground) bg-white" />
                <Link href={path.public.user.getHref(user.id)} className="hover:text-(--secondary) hover:underline transition-all">{user.handler}</Link>
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