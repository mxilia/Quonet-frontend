"use client"

import { useInfiniteAnnouncements } from "../api/get-announcements"
import { useState } from "react"
import { AnnouncementBox } from "./announcement-box"
import { AnnouncementsListSkeleton } from "./skeletons/announcements-list-skeleton"

export const AnnouncementsList = () => {
  const [showPast, setShowPast] = useState(false)
  const announcementsQuery = useInfiniteAnnouncements()
  if (announcementsQuery.isLoading) return <AnnouncementsListSkeleton />
  const announcements = announcementsQuery.data?.pages.flatMap((page) => page.data)
  return (
    <div className="mb-2 w-full">
      <h1 className="mb-2 text-2xl">Announcements</h1>
      <div className="inline-flex w-full flex-col gap-2">
        {showPast ? (
          announcements?.map((e) => <AnnouncementBox key={e.id} announcement={e} />)
        ) : announcements !== undefined && announcements.length > 0 ? (
          <AnnouncementBox key={announcements[0].id} announcement={announcements[0]} />
        ) : (
          <div className="text-sm text-neutral-500"> no announcement at this time </div>
        )}
      </div>
      {announcements && announcements.length > 0 && (
        <div onClick={() => setShowPast(!showPast)} className="mt-1 text-xs text-neutral-400">
          {showPast ? "hide past announcements" : "show past announcements"}
        </div>
      )}
    </div>
  )
}
