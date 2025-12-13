import { ThreadList } from './threads-list';
import { CreateThread } from './create-thread';

export const Threads = () => {
  return (
    <div className='border'>
      <CreateThread/>
      <ThreadList/>
    </div>
  )
}