'use client';

import { CreateAnnouncement } from "@/features/announcements/components/create-announcement";
import { CreateThread } from "@/features/threads/components/create-thread";
import { useUser } from "@/lib/auth";
import { isAdmin } from "@/lib/authorization";

const AdminPage = () => {
  const user = useUser();
  
  if(user.isLoading) return null;
  if(!isAdmin(user.data)) return null;

  return (
    <div className="bg-black min-h-screen pt-17 text-white">
      <CreateAnnouncement />
      <CreateThread />
    </div>
  )
}

export default AdminPage;