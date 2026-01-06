import { Post } from "@/types/api"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
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
        <div className={cn("flex h-11 w-11 v items-center justify-center rounded-xl bg-(--darker-foreground) hover:bg-foreground transition-colors duration-200", className)}>
          <Image src="/settings-icon.png" height={27} width={27} className="invert-80" alt="comment img" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="bg-(--darker-foreground)/80 hover:border-secondary transition-colors duration-200 mt-1 rounded-lg border border-foreground p-1 px-2">
          <DeletePost post={post} className="border-0 text-red-500 text-sm p-0 m-0 w-full text-left"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}