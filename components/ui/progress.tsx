"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => {
  const [val, setVal] = React.useState(0)

  React.useEffect(() => {
    const animate = () => setVal(value!)
    const frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [value])

  const indicatorClass = cn(
    "h-full w-full flex-1 transition-all duration-[2000ms] ease-in-out",
    val >= 75 ? "bg-green-500" : val >= 50 ? "bg-amber-500" : "bg-red-500"
  )

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={indicatorClass}
        style={{ transform: `translateX(-${100 - val}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
