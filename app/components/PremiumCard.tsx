"use client";

import { motion } from "framer-motion";

export default function PremiumCard({
  title,
  desc,
  children
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="card soft-ring rounded-3xl p-5"
    >
      <div className="text-sm font-semibold text-white/90">{title}</div>
      {desc ? <div className="mt-1 text-sm text-zinc-300">{desc}</div> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </motion.div>
  );
}