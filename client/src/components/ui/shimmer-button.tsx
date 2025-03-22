"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function ShimmerButton({ children, className, ...props }: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md border border-slate-800 bg-slate-800 px-6 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50",
        "group relative overflow-hidden",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 z-0 scale-x-[2.0] bg-gradient-to-r from-zinc-900/0 via-zinc-100/20 to-zinc-900/0 opacity-0 transition-opacity duration-1000 group-hover:animate-shimmer group-hover:opacity-100" />
    </button>
  )
}

