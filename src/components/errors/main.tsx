import { path } from "@/config/path"
import Link from "next/link"

export const MainErrorFallBack = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <div className="text-lg text-neutral-100">
        Something went wrong T-T
        <br />
        <Link href={path.home.getHref()} className="text-blue-500 hover:underline">
          {" "}
          Click here to return to home page{" "}
        </Link>
      </div>
    </div>
  )
}
