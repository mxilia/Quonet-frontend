import { useInfiniteThreads } from "../api/get-threads"
import { DeleteThread } from "./delete-thread";

export const ThreadList = () => {
  const threadsQuery = useInfiniteThreads();
  if(threadsQuery.isLoading) return <div> loading.. </div> ;

  const threads = threadsQuery.data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <h1>Thread list:</h1>
      <div>-----------------------------------</div>
      {
        threads?.map((e) => (
          <div key={e.id}>
            <div>{e.title}</div>
            <DeleteThread threadId={e.id}></DeleteThread>
          </div>
        )
      )}
      <div>-----------------------------------</div>
    </div>
  )
}