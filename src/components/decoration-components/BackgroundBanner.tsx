'use client'
import React from 'react';
import {Picture} from "~/lib/sanity.types";
import Image from "next/image";
import {urlForImage} from "~/lib/sanity.image";
import {useBannerAspect} from "~/utils/hooks/useBannerAspect";
import {getImageDimensions} from "@sanity/asset-utils";

export type BackgroundBannerProps = {
  bg: Picture
}

export default function BackgroundBanner({ bg }: BackgroundBannerProps) {
  const originalAspect = getImageDimensions(bg.image).aspectRatio
  const aspect = useBannerAspect(originalAspect);

  return (
    <div className={`w-screen relative` } style={{aspectRatio: aspect}}>
      <Image src={urlForImage(bg.image)?.url() ?? ''} alt={bg.title} width={0} height={0} sizes="100vw"
             className="w-screen fixed overflow-y-hidden"/>
    </div>
  );
}
