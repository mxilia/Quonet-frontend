import { ImageFrame } from "@/components/ui/image-frame/image-frame"
import { path } from "@/config/path"
import { Announcement } from "@/types/api"
import { timestampToDate } from "@/utils/format"
import Link from "next/link"

type AnnouncementBoxProps = {
  announcement: Announcement
}

export const AnnouncementBox = ({ announcement }: AnnouncementBoxProps) => {
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
