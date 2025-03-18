import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/60 focus-visible:ring-[4px] aria-invalid:ring-red-500/30 dark:aria-invalid:ring-red-500/50 aria-invalid:border-red-500",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow-md hover:bg-blue-700",
        destructive: "bg-red-600 text-white shadow-md hover:bg-red-700",
        outline: "border bg-transparent shadow-md hover:bg-gray-100",
        secondary: "bg-green-600 text-white shadow-md hover:bg-green-700",
        ghost: "hover:bg-gray-200 hover:text-black",
        link: "text-blue-600 underline-offset-4 hover:underline",
        black: "bg-black text-white shadow-md hover:bg-gray-900",
      },
      
      size: {
        default: "h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-lg gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-lg px-8 has-[>svg]:px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
