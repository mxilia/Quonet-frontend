'use client';

import { path } from "@/config/path";
import { DeleteUser } from "@/features/users/components/delete-user";
import { UpdateUserBio } from "@/features/users/components/update-user-bio";
import { UpdateUserHandler } from "@/features/users/components/update-user-handler";
import { useLogout, useUser } from "@/lib/auth"
import { isAdmin } from "@/lib/authorization";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SettingsPage = () => {
  const router = useRouter();
  const user = useUser();
  const logout = useLogout({
    onSuccess: () => {
      router.push(path.public.login.getHref())
    }
  });

  useEffect(() => {
    if(!user.isLoading && !user.data){
      router.push(path.home.getHref())
    }
  }, [user.isLoading, user.data, router])

  const onLogout = () => {
    logout.mutate()
  }

  return (
    <div className="bg-black min-h-screen pt-17 text-white flex justify-center">
      <div className="inline-flex flex-col w-full sm:w-150 sm:p-2 pl-4 pr-4 pt-3">
        <h1 className="text-2xl mb-1 border-b border-(--foreground) pb-2">Settings</h1>
        <UpdateUserBio />
        <UpdateUserHandler />
        { isAdmin(user.data) &&
          <Link href={path.admin.dashboard.getHref()}>
            <button className="w-fit p-1 mb-5 px-2 border border-green-400 text-green-400 rounded-xl text-sm hover:bg-(--darker-foreground)"> dashboard </button>
          </Link>
        }
        <button onClick={onLogout} className="w-fit p-1 mb-5 px-2 border border-amber-400 text-amber-400 rounded-xl text-sm hover:bg-(--darker-foreground)"> logout </button>
        <DeleteUser />
      </div>
    </div>
  );
}

export default SettingsPage;