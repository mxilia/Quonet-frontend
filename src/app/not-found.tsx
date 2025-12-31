import { path } from "@/config/path"
import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1 bg-black font-semibold text-white">
      <h1>404 - Not Found</h1>
      <Link href={path.home.getHref()} replace>
        {" "}
        Go to Home
      </Link>
    </div>
  )
}

export default NotFoundPage
