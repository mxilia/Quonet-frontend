"use client"

import Image from "next/image"
import { useState } from "react"
import { BlurBackground } from "../background/blur-background"

type ImageFrameProps = {
  src: string
  width: number
  height: number
  alt: string
  imgClassName?: string
  className?: string
}

export const ImageFrame = ({
  src,
  width,
  height,
  alt,
  imgClassName,
  className,
}: ImageFrameProps) => {
  const [zoom, setZoom] = useState(false)
  if (src === "") return null
  return (
    <>
      <div className={`select-none ${className}`}>
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          className={`${imgClassName} object-contain`}
          onClick={() => setZoom(true)}
        />
      </div>
      {zoom && (
        <>
          <div
            className="fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center select-none"
            onClick={() => setZoom(false)}
          >
            <Image src={src} width={500} height={500} className="w-80" alt={alt} />
          </div>
          <BlurBackground />
        </>
      )}
    </>
  )
}
