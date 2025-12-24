'use client';

import { path } from "@/config/path";
import { UpdateUserBio } from "@/features/users/components/update-user-bio";
import { UpdateUserHandler } from "@/features/users/components/update-user-handler";
import { useLogout } from "@/lib/auth"
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const router = useRouter();

  const logout = useLogout({
    onSuccess: () => {
      router.push(path.public.login.getHref())
    }
  });

  const onLogout = () => {
    logout.mutate()
  }

  return (
    <div className="bg-black min-h-screen pt-17 text-white flex justify-center">
      <div className="inline-flex flex-col pt-2 w-150">
        <h1 className="text-2xl mb-1 border-b border-(--foreground) pb-2">Settings</h1>
        <UpdateUserBio />
        <UpdateUserHandler />
        <button onClick={onLogout} className="w-fit p-1 px-2 border border-red-500 text-red-500 rounded-xl text-sm hover:bg-(--darker-foreground)"> logout </button>
      </div>
    </div>
  );
}

export default SettingsPage;