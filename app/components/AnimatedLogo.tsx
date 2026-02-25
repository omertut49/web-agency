"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedLogo({
  href = "/",
  size = 40,
}: {
  href?: string;
  size?: number;
}) {
  const h = size;
  const w = Math.round(size * 1.2);

  return (
    <Link href={href} className="inline-flex items-center select-none">
      <div className="relative overflow-hidden" style={{ width: w, height: h }}>
        <motion.div
          className="absolute top-0 left-0"
          animate={{
            x: ["-55%", "-10%", "-10%", "115%"], // gir → DUR → çık
          }}
          transition={{
            duration: 4.8,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.18, 0.52, 1], // duraksama daha uzun
          }}
        >
          <motion.svg
            viewBox="0 0 120 100"
            width={w}
            height={h}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* CART BODY */}
            <path
              d="
                M18 35
                C18 28 24 24 30 24
                H36
                C38 24 40 25 42 27
                L46 32
                H95
                C104 32 110 38 110 46
                V60
                C110 69 104 75 95 75
                H50
                C40 75 34 69 34 60
                V40
                H30
                C24 40 18 36 18 30
                Z"
              fill="#FF4B1F"
            />

            {/* CODE SYMBOL */}
            <g
              stroke="#111"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <path d="M58 46 L46 55 L58 64" />
              <path d="M69 44 L63 66" />
              <path d="M77 46 L89 55 L77 64" />
            </g>

            {/* BLUE BASE */}
            <path
              d="M40 82 H98 C103 82 106 79 106 75 V73 H44 C40 73 36 77 36 80 C36 82 38 83 40 83 Z"
              fill="#1F4BFF"
              opacity="0.45"
            />

            {/* WHEELS (sabit hız) */}
            <motion.circle
              cx="55"
              cy="90"
              r="8"
              fill="#163A8A"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "55px 90px" }}
            />
            <motion.circle
              cx="85"
              cy="90"
              r="8"
              fill="#163A8A"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "85px 90px" }}
            />
          </motion.svg>
        </motion.div>
      </div>
    </Link>
  );
}