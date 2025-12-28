
type SkeletonProps = {
  className?: string
}

export const Skeleton = ({ className } : SkeletonProps) => {
  return (
    <div className={`animate-pulse bg-neutral-800/70 rounded-[14px] ${className}`}/>
  )
}