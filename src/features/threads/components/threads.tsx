import { ThreadList } from "./threads-list"
import { CreateThread } from "./create-thread"

export const Threads = () => {
  return (
    <div className="w-full">
      <CreateThread />
      <ThreadList />
    </div>
  )
}
