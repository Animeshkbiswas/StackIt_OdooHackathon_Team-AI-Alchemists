import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-input bg-background hover:bg-hover-bg hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-hover-bg hover:text-accent-foreground",
        link: "text-reddit-blue underline-offset-4 hover:underline",
        reddit: "bg-reddit-orange text-white hover:bg-reddit-orange-hover shadow-sm font-bold",
        "reddit-outline": "border border-reddit-orange text-reddit-orange bg-background hover:bg-reddit-orange hover:text-white font-bold",
        "reddit-blue": "bg-reddit-blue text-white hover:bg-reddit-blue-hover shadow-sm font-bold",
        vote: "p-1 rounded-sm border border-transparent hover:bg-hover-bg transition-all duration-200",
        filter: "bg-reddit-gray text-foreground hover:bg-reddit-blue hover:text-white data-[active=true]:bg-reddit-blue data-[active=true]:text-white rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-7 rounded-full px-3 text-xs",
        lg: "h-11 rounded-full px-8 text-base",
        icon: "h-9 w-9",
        "vote-icon": "h-6 w-6 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
