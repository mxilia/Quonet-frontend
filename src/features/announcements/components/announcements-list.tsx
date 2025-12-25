"use client";

import { Announcement } from "@/types/api";
import { useInfiniteAnnouncements } from "../api/get-announcements"
import { useState } from "react";
import Image from "next/image";
import { timestampToDate } from "@/utils/format";
import Link from "next/link";
import { path } from "@/config/path";
import { ImageFrame } from "@/components/ui/image-frame/image-frame";

type AnnouncementBoxProps = {
  announcement: Announcement;
}

const AnnouncementBox = ({ announcement } : AnnouncementBoxProps) => {
  return (
    <div className="border border-(--darker-foreground) p-2 pl-3 pr-3 rounded-xl inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(99,102,241,0.35),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.30),transparent_50%)] hover:bg-(--darker-foreground) transition-all">
      <div className="inline-flex gap-2 items-center">
        <ImageFrame src={ announcement.author.profile_url ? announcement.author.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" imgClassName="border rounded-xl w-8 h-8 border-(--foreground) flex items-center justify-center bg-white"/>
        <div>
          <Link href={path.public.user.getHref(announcement.author_id)} className="text-[16px] text-neutral-300 inline hover:underline">{ announcement.author.handler }</Link>
          <div className="text-xs text-neutral-500">{ timestampToDate(announcement.created_at) }</div>
        </div>
      </div>
      <div className="text-xl text-neutral-200">{announcement.content}</div>
    </div>
  )
}

export const AnnouncementsLists = () => {
  const [showPast, setShowPast] = useState(false);
  const announcementsQuery = useInfiniteAnnouncements();

  if(announcementsQuery.isLoading) return <div>loading</div>;

  const announcements = announcementsQuery.data?.pages.flatMap((page) => page.data)
  return (
    <div className="w-full mb-2">
      <h1 className="text-2xl mb-2">Announcements</h1>
      <div className="inline-flex flex-col gap-2 w-full">
        {
          showPast ? 
          announcements?.map((e) => <AnnouncementBox key={e.id} announcement={e} />)
          :
          (announcements !== undefined && announcements.length>0 ? 
            <AnnouncementBox key={announcements[0].id} announcement={announcements[0]} />
            :
            <div> no announcement at this time </div>
          )
        }
      </div>
      <div onClick={() => setShowPast(!showPast)} className="mt-1 text-xs text-neutral-400">{showPast ? "hide past announcements" : "show past announcements"}</div>
    </div>
  )
}