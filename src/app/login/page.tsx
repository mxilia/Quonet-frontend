"use client"

import { path } from "@/config/path"
import { RedirectButton } from "./_components/redirect-button"
import Image from "next/image"
import { env } from "@/config/env"
import { useEffect, useState } from "react"
import { useUser } from "@/lib/auth"

const LoginPage = () => {
  const loginPath = `${env.API_URL}/auth/google/login`

  const user = useUser()
  const [redirectPath, setRedirect] = useState("")

  useEffect(() => {
    if (user.data) setRedirect(path.home.getHref())
    else setRedirect(loginPath)
  }, [user.data])

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="flex w-95 flex-col items-center gap-2 rounded-xl bg-(--darker-foreground) p-2 pt-4 pb-4 [@media(min-width:300px)]:w-100">
        <div className="flex h-20 w-70 items-center justify-center">
          <Image
            src="/logo.svg"
            alt="quonet's logo"
            width={200}
            height={50}
            className="object-cover object-center"
          />
        </div>
        <RedirectButton
          text="Sign in with Google Account"
          redirectPath={redirectPath}
          imgPath="/google-logo.png"
        />
        <div className="flex w-10/12 items-center text-neutral-500">
          <div className="h-0 w-full border-t"></div>
          <div className="mr-1 ml-1">OR</div>
          <div className="h-0 w-full border-t"></div>
        </div>
        <RedirectButton
          text="Anonymously read Quonet"
          redirectPath={path.home.getHref()}
          imgPath="/default-avatar.png"
        />
        <span className="mb-3 w-10/12 text-xs text-neutral-500">
          This application is a test/demo project and is provided “AS IS”. The owner is not liable
          for any damages, data loss, or issues arising from the use of this application. Use at
          your own risk.
        </span>
        <div className="mt-10 text-xs text-neutral-300">© 2025 mxilia</div>
      </div>
    </div>
  )
}

export default LoginPage
