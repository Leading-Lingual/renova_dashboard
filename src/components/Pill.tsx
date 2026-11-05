import React, { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva("rounded-md px-2.5 w-fit", {
  variants: {
    variant: {
      brand: "bg-brand-50/50 text-brand-700!",
      accent: "bg-accent-50 text-accent-700!",
      grey: "bg-black-50 text-black-700!",
      error: "bg-danger-50 text-danger-700!",
      secondary: "bg-blue-50 text-blue-700!"
    },
    small: {
      true: "py-1.5 text-2s-medium",
      false: "py-2 text-s font-bold",
    },
  },
  defaultVariants: {
    variant: "brand",
    small: false,
  },
});

interface PillProps
  extends React.ComponentProps<"div">, VariantProps<typeof pillVariants> {
  children: ReactNode;
}

const Pill = ({ className, variant, small, children, ...props }: PillProps) => {
  return (
    <div
      data-slot="pill"
      className={cn(pillVariants({ variant, small, className }))}
      {...props}
    >
      {children}
    </div>
  );
};

export default Pill;
