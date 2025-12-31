import { path } from "@/config/path"
import Link from "next/link"

export const MainErrorFallBack = () => {
  return (
    <div className="bg-black flex h-screen justify-center items-center">
      <div className="text-lg text-neutral-100">
        Something went wrong T-T<br/>
        <Link href={path.home.getHref()} className="text-blue-500 hover:underline"> Click here to return to home page </Link>
      </div>
    </div>
  )
}
