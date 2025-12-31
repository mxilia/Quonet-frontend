import Image from "next/image"

type RedirectButtonProps = {
  text: string
  redirectPath: string
  imgPath?: string
}

export const RedirectButton = ({ text, redirectPath, imgPath }: RedirectButtonProps) => {
  return (
    <a
      href={redirectPath}
      className="inline-flex w-70 justify-center gap-3 rounded-2xl border-2 bg-neutral-100 p-2 hover:border-(--secondary)"
    >
      {imgPath !== undefined ? (
        <Image src={imgPath} height={25} width={25} alt="google logo" />
      ) : null}
      <span>{text}</span>
    </a>
  )
}
