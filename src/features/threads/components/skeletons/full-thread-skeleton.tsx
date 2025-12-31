import { Skeleton } from "@/components/ui/skeleton/skeleton"

export const FullThreadSkeleton = () => {
  return (
    <div className="mt-3 mb-3 inline-flex w-full flex-col rounded-2xl border border-(--darker-foreground) bg-(--darker-foreground) p-3">
      <div className="inline-flex items-center gap-3">
        <Skeleton className="h-15 w-15" />
        <Skeleton className="h-10 w-40" />
      </div>
      <Skeleton className="mt-2 h-8 w-30" />
      <Skeleton className="t-2 mt-2 mb-2 h-30 w-full" />
    </div>
  )
}
