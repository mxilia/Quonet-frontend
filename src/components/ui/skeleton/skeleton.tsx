type SkeletonProps = {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={`animate-pulse rounded-[14px] bg-neutral-800/70 ${className}`} />
}
