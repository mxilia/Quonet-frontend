"use client"

import { Announcement } from "@/types/api"
import { useInfiniteAnnouncements } from "../api/get-announcements"
import { useState } from "react"
import Image from "next/image"
import { timestampToDate } from "@/utils/format"
import Link from "next/link"
import { path } from "@/config/path"
import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { Skeleton } from "@/components/ui/skeleton/skeleton"

type AnnouncementBoxProps = {
  announcement: Announcement
}

const AnnouncementBox = ({ announcement }: AnnouncementBoxProps) => {
  return (
    <div className="inset-0 rounded-xl border border-(--darker-foreground) bg-[radial-gradient(circle_at_30%_25%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.30),transparent_50%)] p-2 pr-3 pl-3 transition-all hover:bg-(--darker-foreground)">
      <div className="inline-flex items-center gap-2">
        <ImageFrame
          src={
            announcement.author.profile_url
              ? announcement.author.profile_url
              : "/default-avatar.png"
          }
          height={30}
          width={30}
          alt="user profile"
          imgClassName="border rounded-xl w-8 h-8 border-(--foreground) flex items-center justify-center bg-white"
        />
        <div>
          <Link
            href={path.public.user.getHref(announcement.author_id)}
            className="inline text-[16px] text-neutral-300 hover:underline"
          >
            {announcement.author.handler}
          </Link>
          <div className="text-xs text-neutral-500">{timestampToDate(announcement.created_at)}</div>
        </div>
      </div>
      <div className="text-xl text-neutral-200">{announcement.content}</div>
    </div>
  )
}

export const AnnouncementsLists = () => {
  const [showPast, setShowPast] = useState(false)
  const announcementsQuery = useInfiniteAnnouncements()
  if (announcementsQuery.isLoading)
    return (
      <div className="mb-2 w-full">
        <h1 className="mb-2 text-2xl">Announcements</h1>
        <Skeleton className="h-30 w-full" />
      </div>
    )
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
