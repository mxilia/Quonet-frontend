import { AnnouncementBoxSkeleton } from "./announcement-box-skeleton"

export const AnnouncementsListSkeleton = () => {
  return (
    <div className="mb-2 w-full">
      <h1 className="mb-2 text-2xl">Announcements</h1>
      <AnnouncementBoxSkeleton />
    </div>
  )
}
