"use client";

import { Announcement } from "@/types/api";
import { useInfiniteAnnouncements } from "../api/get-announcements"
import { useState } from "react";
import Image from "next/image";
import { timestampToDate } from "@/utils/format";

type AnnouncementBoxProps = {
  announcement: Announcement;
}

const AnnouncementBox = ({ announcement } : AnnouncementBoxProps) => {
  return (
    <div className="p-2 pl-3 pr-3 bg-(--darker-foreground) rounded-xl transition-all hover:bg-neutral-800">
      <div className="inline-flex gap-2 items-center">
        <Image src={ announcement.author.profile_url ? announcement.author.profile_url : "/default-avatar.png"} height={30} width={30} alt="user profile" className="border rounded-xl w-8 h-8 flex items-center justify-center bg-white"/>
        <div>
          <div className="text-[16px] text-neutral-300 inline">{ announcement.author.handler }</div>
          <div className="text-xs text-neutral-500">{ timestampToDate(announcement.created_at) }</div>
        </div>
      </div>
      <div className="text-xl">{announcement.content}</div>
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