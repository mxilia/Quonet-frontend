"use client"

import { CreateAnnouncement } from "@/features/announcements/components/create-announcement"
import { CreateThread } from "@/features/threads/components/create-thread"
import { AdminUsersList } from "@/features/users/components/admin-users-list"
import { useUser } from "@/lib/auth"
import { isAdmin } from "@/lib/authorization"

const AdminPage = () => {
  const user = useUser()

  if (user.isLoading) return <div className="min-h-screen w-full bg-black" />
  if (!isAdmin(user.data)) return <div className="min-h-screen w-full bg-black" />

  return (
    <div className="flex justify-center min-h-screen w-full bg-black pt-17 text-white">
      <div className="sm:w-150 px-2">
        <CreateAnnouncement />
        <CreateThread />
        <AdminUsersList />
      </div>
    </div>
  )
}

export default AdminPage
