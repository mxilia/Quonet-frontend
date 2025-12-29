import { path } from "@/config/path";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col h-screen gap-1 items-center justify-center bg-black text-white font-semibold">
      <h1>404 - Not Found</h1>
      <Link href={path.home.getHref()} replace> Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;