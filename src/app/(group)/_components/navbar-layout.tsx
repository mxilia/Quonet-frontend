'use client';

import { path } from "@/config/path";
import { useUser } from "@/lib/auth";
import { isLogin } from "@/lib/authorization";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const Layout = ({ children } : { children: React.ReactNode }) => {
  const user = useUser();
  const currentPath = usePathname();
  if(user.isLoading) return <div>is loading</div>;
  return (
    <>
      <nav className="z-50 [@media(max-width:1000px)]:justify-center flex items-center xl:pl-48 lg:pl-7 h-17 bg-black/30 backdrop-blur-lg fixed w-full pr-4 sm:pr-10 text-white border-b border-b-(--foreground)">
        <Link href={path.home.getHref()}>
          <Image src="/logo.svg" alt="quonet's logo" width={130} height={50} className="pb-2 mr-4 hover:blur-xs transition-all" />
        </Link>
        <input placeholder="Search?" className="bg-(--darker-foreground) hidden [@media(min-width:1000px)]:flex text-sm w-150 h-7 mr-10 rounded-lg text-white p-2 pl-4 pr-4"/>
        <Link href={path.home.getHref()} className={`${currentPath === "/" ? "bg-(--foreground)/50" : ""} hover:bg-(--secondary)/30 transition-colors rounded-xl mr-8 p-2`}>
          <Image src="/home-icon.png" width={27} height={27} alt="home" className="invert-90"/>
        </Link>
        <Link href={path.public.feed.getHref()} className={`${currentPath === "/feed" ? "bg-(--foreground)/50" : ""} hover:bg-(--secondary)/30 transition-colors rounded-xl mr-6 p-2`}>
          <Image src="/feeds-icon.png" width={27} height={27} alt="feed" className="invert-90"/>
        </Link>
        {
          isLogin(user.data) &&
          <Link href={path.private.settings.getHref()} className={`${currentPath === "/settings" ? "bg-(--foreground)/50" : ""} hover:bg-(--secondary)/30 transition-colors rounded-xl mr-8 p-2`}>
            <Image src="/settings-icon.png" width={27} height={27} alt="settings" className="invert-90"/>
          </Link>
        }
        <div className="inline-flex items-center gap-3">
          {
            user.data ?
              <>
                <Image src={user.data?.profile_url ? user.data.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="rounded-full border border-(--foreground) bg-white" />
                <Link href={path.public.user.getHref(user.data!.id)} className="[@media(min-width:420px)]:inline truncate hidden hover:text-(--secondary) hover:underline transition-all">{user.data!.handler}</Link>
              </>
            :
            <Link href={path.public.login.getHref()}>
              <button className="rounded-xl p-1 px-3 hover:bg-(--secondary)/40 transition-colors">
                Log In
              </button>
            </Link>
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