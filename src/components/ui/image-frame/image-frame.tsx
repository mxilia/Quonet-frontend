'use client';

import Image from "next/image";
import { useState } from "react";
import { BlurBackground } from "../background/blur-background";

type ImageFrameProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  imgClassName?: string
  fallbackPath?: string;
  className?: string;
}

export const ImageFrame = ({ src, width, height, alt, imgClassName, fallbackPath, className } : ImageFrameProps) => {
  const [zoom, setZoom] = useState(false);
  return (
    <>
      <div className={className}>
        <Image src={src} width={width} height={height} alt={alt} className={imgClassName} onClick={() => setZoom(true)}/>
      </div>
      {zoom && 
        <>
          <div className="fixed top-0 left-0 z-10 h-screen w-screen flex justify-center items-center" onClick={() => setZoom(false)}>
            <Image src={src} width={160} height={160} className="w-80" alt={alt}/>
          </div>
          <BlurBackground />
        </>
      }
    </>
  )
}