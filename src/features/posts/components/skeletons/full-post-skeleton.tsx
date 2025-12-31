import { Skeleton } from "@/components/ui/skeleton/skeleton"

export const FullPostSkeleton = () => {
  return (
    <div className="inline-flex w-200 flex-col p-4">
      <div className="inline-flex items-center">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="ml-2 h-5 w-20" />
      </div>
      <Skeleton className="mt-3 inline h-10 w-50" />
      <Skeleton className="mt-3 h-50 w-full" />
    </div>
  )
}
