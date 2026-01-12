import { Skeleton } from "@/components/ui/skeleton/skeleton"

export const SmallPostSkeleton = () => {
  return (
    <div className="inline-flex max-w-50 flex-col justify-between rounded-xl border border-black bg-(--darker-foreground) p-2">
      <div className="inline-flex max-w-50 gap-2">
        <Skeleton className="h-10 max-w-10" />
        <div>
          <Skeleton className="mb-1 h-5 max-w-12" />
          <Skeleton className="h-12 max-w-30" />
        </div>
      </div>
      <Skeleton className="mb-1 h-5 max-w-12" />
      <Skeleton className="h-5 max-w-12" />
    </div>
  )
}
