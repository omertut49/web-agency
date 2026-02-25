"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  strength?: number;
};

export default function MagneticButton({
  children,
  href,
  className = "",
  strength = 0.22,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [xy, setXy] = useState({ x: 0, y: 0 });

  const base = useMemo(
    () =>
      "inline-flex items-center justify-center rounded-full transition will-change-transform focus:outline-none",
    []
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);

    setXy({ x: dx * strength, y: dy * strength });
  };

  const onLeave = () => setXy({ x: 0, y: 0 });

  const style = {
    transform: `translate3d(${xy.x}px, ${xy.y}px, 0)`,
  };

  // 🔥 ÇÖZÜM: Link'e props yaymak yerine div wrapper kullanıyoruz
  if (href) {
    return (
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={style}
        className={`${base} ${className}`}
      >
        <Link href={href} className="w-full h-full inline-flex items-center justify-center">
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={style}
      className={`${base} ${className}`}
    >
      <button type="button" className="w-full h-full">
        {children}
      </button>
    </div>
  );
}