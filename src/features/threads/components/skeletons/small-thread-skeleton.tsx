import { Skeleton } from "@/components/ui/skeleton/skeleton"

export const SmallThreadSkeleton = () => {
  return (
    <div>
      <div className="inline-flex w-full items-center gap-2 rounded-xl border border-black bg-(--foreground)/30 p-2 hover:border-(--secondary)">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-5 w-50" />
      </div>
    </div>
  )
}
