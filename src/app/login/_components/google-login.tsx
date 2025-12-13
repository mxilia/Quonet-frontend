import { path } from "@/config/path";
import Image from 'next/image';

export const GoogleLoginButton = () => {
  return (
    <a href={path.auth.oauth.getHref()}>
      <div className="flex w-65 gap-2 justify-center items-center rounded-xl border">
        <Image src="/google-logo.png" height={25} width={25} alt="google logo"/>
        Login With Google Account
      </div>
    </a>
  )
}