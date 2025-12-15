import Image from 'next/image';

type RedirectButtonProps = {
  text: string;
  redirectPath: string;
  imgPath?: string;
}

export const RedirectButton = ({ text, redirectPath, imgPath } : RedirectButtonProps) => {
  return (
    <a
      href={redirectPath}
      className="inline-flex gap-3 w-70 rounded-2xl border p-2 bg-neutral-100 justify-center"
    >
      {imgPath !== undefined ? <Image src={imgPath} height={25} width={25} alt="google logo"/> : null}
      <span>{ text }</span>
    </a>
  )
}