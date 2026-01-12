import { Skeleton } from "@/components/ui/skeleton/skeleton"

export const SmallPostSkeleton = () => {
  return (
    <div className="inline-flex max-w-50 flex-col justify-between rounded-xl border border-black bg-(--darker-foreground) p-2">
      <div className="inline-flex max-w-50 gap-2">
        <Skeleton className="h-10 w-10" />
        <div className="w-full">
          <Skeleton className="mb-1 h-5 w-12" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <Skeleton className="mb-1 h-5 w-12" />
      <Skeleton className="h-5 w-12" />
    </div>
  )
}
