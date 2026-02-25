"use client";

import { useEffect, useRef } from "react";

type Options = {
  open: boolean;
  onClose: () => void;
  focusSelector?: string; // drawer içindeki ilk focus olacak eleman
};

export function useDrawerA11y({ open, onClose, focusSelector }: Options) {
  const lastActiveEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // 1) ESC ile kapat
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // 2) focus restore
    lastActiveEl.current = document.activeElement as HTMLElement | null;

    // 3) scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    // 4) drawer açılınca içeri focus
    const t = window.setTimeout(() => {
      if (!focusSelector) return;
      const el = document.querySelector<HTMLElement>(focusSelector);
      el?.focus();
    }, 0);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);

      // scroll lock geri al
      document.body.style.overflow = prevOverflow;

      // focus restore
      lastActiveEl.current?.focus?.();
      lastActiveEl.current = null;
    };
  }, [open, onClose, focusSelector]);
}