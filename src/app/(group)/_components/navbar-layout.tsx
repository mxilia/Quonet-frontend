"use client"

import { Skeleton } from "@/components/ui/skeleton/skeleton"
import { path } from "@/config/path"
import { useUser } from "@/lib/auth"
import { isLogin } from "@/lib/authorization"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  const currentPath = usePathname()
  if (user.isLoading)
    <>
      <nav className="fixed z-50 flex h-17 w-full items-center border-b border-b-(--foreground) bg-black/30 pr-4 text-white backdrop-blur-lg sm:pr-10 lg:pl-7 xl:pl-48 [@media(max-width:1000px)]:justify-center">
        <Skeleton className="mr-4 h-[50px] w-[130px] pb-2" />
        <Skeleton className="mr-10p-2 hidden h-7 w-150 pr-4 pl-4 [@media(min-width:1000px)]:flex" />
        <Skeleton className="mr-8 h-[27px] w-[27px] p-2" />
        <Link href={path.public.feed.getHref()} className="mr-6 h-[27px] w-[27px] p-2" />
      </nav>
    </>
  return (
    <>
      <nav className="fixed z-50 flex h-17 w-full items-center border-b border-b-(--foreground) bg-black/30 pr-4 text-white backdrop-blur-lg sm:pr-10 lg:pl-7 xl:pl-48 [@media(max-width:1000px)]:justify-center">
        <Link href={path.home.getHref()}>
          <Image
            src="/logo.svg"
            alt="quonet's logo"
            width={130}
            height={50}
            className="mr-4 pb-2 transition-all hover:blur-xs"
          />
        </Link>
        <input
          placeholder="Search?"
          className="mr-10 hidden h-7 w-150 rounded-lg bg-(--darker-foreground) p-2 pr-4 pl-4 text-sm text-white [@media(min-width:1000px)]:flex"
        />
        <Link
          href={path.home.getHref()}
          className={`${currentPath === "/" ? "bg-(--foreground)/50" : ""} mr-8 rounded-xl p-2 transition-colors hover:bg-(--secondary)/30`}
        >
          <Image src="/home-icon.png" width={27} height={27} alt="home" className="invert-90" />
        </Link>
        <Link
          href={path.public.feed.getHref()}
          className={`${currentPath === "/feed" ? "bg-(--foreground)/50" : ""} mr-6 rounded-xl p-2 transition-colors hover:bg-(--secondary)/30`}
        >
          <Image src="/feeds-icon.png" width={27} height={27} alt="feed" className="invert-90" />
        </Link>
        {isLogin(user.data) && (
          <Link
            href={path.private.settings.getHref()}
            className={`${currentPath === "/settings" ? "bg-(--foreground)/50" : ""} mr-8 rounded-xl p-2 transition-colors hover:bg-(--secondary)/30`}
          >
            <Image
              src="/settings-icon.png"
              width={27}
              height={27}
              alt="settings"
              className="invert-90"
            />
          </Link>
        )}
        <div className="inline-flex items-center gap-3">
          {user.data ? (
            <Link
              href={path.public.user.getHref(user.data!.id)}
              className="inline-flex items-center gap-3"
            >
              <Image
                src={user.data?.profile_url ? user.data.profile_url : "/default-avatar.png"}
                height={30}
                width={30}
                alt="user profile"
                className="rounded-full border border-(--foreground) bg-white"
              />
              <div className="hidden truncate transition-all hover:text-(--secondary) hover:underline [@media(min-width:420px)]:inline">
                {user.data!.handler}
              </div>
            </Link>
          ) : (
            <Link href={path.public.login.getHref()}>
              <button className="rounded-xl p-1 px-3 transition-colors hover:bg-(--secondary)/40">
                Log In
              </button>
            </Link>
          )}
        </div>
      </nav>
      {children}
    </>
  )
}

export const NavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Layout>{children}</Layout>
    </>
  )
}
