"use client"

import { path } from "@/config/path"
import { DeleteUser } from "@/features/users/components/delete-user"
import { UpdateUserBio } from "@/features/users/components/update-user-bio"
import { UpdateUserHandler } from "@/features/users/components/update-user-handler"
import { useLogout, useUser } from "@/lib/auth"
import { isAdmin } from "@/lib/authorization"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SettingsPage = () => {
  const router = useRouter()
  const user = useUser()
  const logout = useLogout({
    onSuccess: () => {
      router.push(path.public.login.getHref())
    },
  })

  useEffect(() => {
    if (!user.isLoading && !user.data) {
      router.push(path.home.getHref())
    }
  }, [user.isLoading, user.data, router])

  const onLogout = () => {
    logout.mutate()
  }

  return (
    <div className="flex min-h-screen justify-center bg-black pt-17 text-white">
      <div className="inline-flex w-full flex-col pt-3 pr-4 pl-4 sm:w-150 sm:p-2">
        <h1 className="mb-1 border-b border-(--foreground) pb-2 text-2xl">Settings</h1>
        {user.data && (
          <UpdateUserBio
            userId={user.data!.id}
            handler={user.data!.handler}
            email={user.data!.email}
          />
        )}
        {user.data && (
          <UpdateUserHandler
            userId={user.data!.id}
            handler={user.data!.handler}
            email={user.data!.email}
          />
        )}
        {isAdmin(user.data) && (
          <Link href={path.admin.dashboard.getHref()}>
            <button className="mb-5 w-fit rounded-xl border border-green-400 p-1 px-2 text-sm text-green-400 hover:bg-(--darker-foreground)">
              {" "}
              dashboard{" "}
            </button>
          </Link>
        )}
        <button
          onClick={onLogout}
          className="mb-5 w-fit rounded-xl border border-amber-400 p-1 px-2 text-sm text-amber-400 hover:bg-(--darker-foreground)"
        >
          {" "}
          logout{" "}
        </button>
        {user.data && (
          <DeleteUser
            userId={user.data!.id}
            handler={user.data!.handler}
            email={user.data!.email}
          />
        )}
      </div>
    </div>
  )
}

export default SettingsPage
