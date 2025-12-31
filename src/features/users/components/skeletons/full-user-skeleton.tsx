import { Skeleton } from "@/components/ui/skeleton/skeleton"

export const FullUserSkeleton = () => {
  return (
    <div
      className={`mb-2 rounded-2xl border border-(--darker-foreground) bg-(--darker-foreground) p-3`}
    >
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-5 w-25" />
        <Skeleton className="h-5 w-13" />
      </div>
      <Skeleton className="mt-3 h-7 w-12" />
      <Skeleton className="mt-2 h-50 w-full" />
    </div>
  )
}
