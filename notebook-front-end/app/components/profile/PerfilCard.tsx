"use client";

import BaseImg from "../shared/BaseImg";
import { MenuCrear } from "./cardMenuProfile/MenuCrear";

interface ProfileCardProps {
  src: string;
  name: string;
  title: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  boton?: string;
  onClick?: () => void;
}

export default function ProfileCard({
  src,
  name,
  title,
  alt,
  width,
  height,
  className,
  onClick,
}: ProfileCardProps) {
  return (
    <div className="text-center p-6 bg-slate-100 shadow-lg rounded-lg">
      <BaseImg
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onClick={onClick}
      />
      <h1 className="text-2xl font-bold mt-4">{name}</h1>
      <h2 className="text-gray-600 text-lg">{title}</h2>
      <div className="flex justify-start"></div>
      <MenuCrear />
    </div>
  );
}