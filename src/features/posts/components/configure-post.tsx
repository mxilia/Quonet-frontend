import { Post } from "@/types/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { DeletePost } from "./delete-post"
import { cn } from "@/lib/utils"

type ConfigurePostProps = {
  post: Post
  className?: string
}
export const ConfigurePost = ({ post, className }: ConfigurePostProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "v hover:bg-foreground flex h-11 w-11 items-center justify-center rounded-xl bg-(--darker-foreground) transition-colors duration-200",
            className,
          )}
        >
          <Image
            src="/settings-icon.png"
            height={27}
            width={27}
            className="invert-80"
            alt="comment img"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className="hover:border-secondary border-foreground mt-1 rounded-lg border bg-(--darker-foreground)/80 p-1 px-2 transition-colors duration-200"
        >
          <DeletePost
            post={post}
            className="m-0 w-full border-0 p-0 text-left text-sm text-red-500"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
