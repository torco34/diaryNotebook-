"use client";

import Image from "next/image";
import { BaseImgProps } from "./ts/BaseType";

export default function BaseImg({
  src,
  alt,
  width,
  height,
  className,
  onClick,
}: BaseImgProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className="inline-block bg-blue-100 rounded"
      style={{ cursor: "pointer" }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </div>
  );
}
