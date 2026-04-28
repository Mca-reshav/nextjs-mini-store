"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageWithLoader({
  src,
  alt,
  width,
  height,
  className,
}: any) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative" style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 rounded" />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setLoading(false)}
        className={`rounded object-cover transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        } ${className}`}
      />
    </div>
  );
}