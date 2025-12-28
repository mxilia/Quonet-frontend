"use client";

import { path } from "@/config/path";
import { RedirectButton } from "./_components/redirect-button";
import { useUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import Image from "next/image";

const LoginPage = () => {
  const user = useUser();
  const  [redirectPath, setRedirect] = useState("");

  useEffect(() => {
    if(user.data) setRedirect(path.home.getHref())
    else setRedirect(path.auth.oauth.getHref())
  }, [user.data]);

  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="bg-(--darker-foreground) w-100 rounded-xl flex items-center flex-col p-2 gap-2 pt-4 pb-4">
        <div className="h-20 w-70 flex justify-center items-center">
          <Image src="/logo.svg" alt="quonet's logo" width={200} height={50} className="object-cover object-center" />
        </div>
        <RedirectButton text="Sign in with Google Account" redirectPath={redirectPath} imgPath="/google-logo.png"/>
        <div className="text-neutral-500 flex w-10/12 items-center">
          <div className="border-t w-full h-0"></div>
          <div className="ml-1 mr-1">OR</div>
          <div className="border-t w-full h-0"></div>
        </div>
        <RedirectButton text="Anonymously read Quonet" redirectPath={path.home.getHref()} imgPath="/default-avatar.png"/>
        <span className="text-xs w-10/12 text-neutral-300 mb-3">By continuing you indicate that you agree to Quonet’s 
          <a href="/" className="text-blue-500 hover:underline"> Terms of Service</a> and 
          <a className="text-blue-500 hover:underline"> Privacy Policy.</a>
        </span>
        <div className="text-neutral-300 text-xs mt-10">About - Privacy - Terms - Contact</div>
      </div>
    </div>
  );
}

export default LoginPage;