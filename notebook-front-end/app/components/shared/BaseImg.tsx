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
      onClick={onClick} // El evento se maneja aquí
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()} // Accesibilidad
      className="inline-block"
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
