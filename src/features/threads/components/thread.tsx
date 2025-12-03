import Image from 'next/image';

type ThreadProps = {
  imageUrl: string,
  title: string,
}

export const Thread = ({ imageUrl, title } : ThreadProps) => {
  return (
    <div className='flex items-center flex-col p-2 border w-25 h-30 rounded-xl'>
      <div className='relative w-full aspect-square overflow-hidden rounded-tl-xl rounded-tr-xl'>
        <Image 
          src={imageUrl}
          alt={`${title}'s Image`}
          fill
          className='object-cover'
        />
      </div>
      <div>
        { title }
      </div>
    </div>
  )
}