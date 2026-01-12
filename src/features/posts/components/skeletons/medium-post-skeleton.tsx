import { Skeleton } from "@/components/ui/skeleton/skeleton"
import { RefObject } from "react"

export const MediumPostSkeleton = ({ ref }: { ref?: RefObject<HTMLDivElement | null> }) => {
  return (
    <div
      ref={ref}
      className="border-foreground mt-5 inline-flex h-fit w-full flex-col rounded-xl border p-3 pt-3 pr-4 pl-4"
    >
      <div className="mb-2 inline-flex gap-2">
        <Skeleton className="h-10 w-10" />
        <div>
          <Skeleton className="mb-1 h-5 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <Skeleton className="mb-1 h-10 w-50" />
      <div className="mb-2 inline-flex items-center">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-3 w-14" />
      </div>
      <Skeleton className="h-50 w-full" />
    </div>
  )
}
