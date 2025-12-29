'use client';

import { useUser } from '@/lib/auth';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type LoginButtonProps = {
  text: string;
  loginRedirectPath: string;
  defaultRedirectPath: string;
  imgPath?: string;
  
}

export const LoginButton = ({ text, loginRedirectPath, defaultRedirectPath, imgPath } : LoginButtonProps) => {
  const user = useUser();
  const  [redirectPath, setRedirect] = useState("");

  useEffect(() => {
    if(user.data) setRedirect(defaultRedirectPath)
    else setRedirect(loginRedirectPath)
  }, [user.data]);

  return (
    <a
      href={redirectPath}
      className="inline-flex gap-3 w-70 rounded-2xl border-2 p-2 bg-neutral-100 justify-center hover:border-(--secondary)"
    >
      {imgPath !== undefined ? <Image src={imgPath} height={25} width={25} alt="google logo"/> : null}
      <span>{ text }</span>
    </a>
  )
}