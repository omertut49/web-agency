"use client";

import { useEffect, useRef, useState } from "react";

/** Drawer: ESC ile kapat + focus restore + scroll lock + optional first focus */
export function useDrawerA11y({
  open,
  onClose,
  focusSelector,
}: {
  open: boolean;
  onClose: () => void;
  focusSelector?: string;
}) {
  const lastActiveEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    lastActiveEl.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    const t = window.setTimeout(() => {
      if (!focusSelector) return;
      const el = document.querySelector<HTMLElement>(focusSelector);
      el?.focus();
    }, 0);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveEl.current?.focus?.();
      lastActiveEl.current = null;
    };
  }, [open, onClose, focusSelector]);
}

/** CountUp: canlı fiyat animasyonu (stale state bug'u yok) */
export function useCountUp(target: number, durationMs = 650) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = value;
    const diff = target - from;
    if (diff === 0) return;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + diff * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, value]);

  return value;
}