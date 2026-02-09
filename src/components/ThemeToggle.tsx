"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button
                className={cn(
                    "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-lg text-white transition-all hover:scale-105 active:scale-95",
                    className
                )}
                aria-label="Toggle theme"
            >
                <span className="sr-only">Toggle theme</span>
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={cn(
                "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 dark:bg-black/50 light:bg-white/50 backdrop-blur-lg transition-all hover:scale-105 active:scale-95 group",
                "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--glass-text)]",
                className
            )}
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
