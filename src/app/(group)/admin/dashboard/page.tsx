import { CreateAnnouncement } from "@/features/announcements/components/create-announcement";
import { CreateThread } from "@/features/threads/components/create-thread";


const AdminPage = () => {
  return (
    <div className="bg-black min-h-screen pt-17 text-white">
      <CreateAnnouncement />
      <CreateThread />
    </div>
  )
}

export default AdminPage;