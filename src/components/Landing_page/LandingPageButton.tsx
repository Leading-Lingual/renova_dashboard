import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline"|"ghost";
type ButtonSize = "default" | "compact";

type SharedProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
};

type ButtonProps = SharedProps;

const variants: Record<ButtonVariant, string> = {
  primary: "bg-product text-white hover:bg-product-700",
  outline:
    "border border-product bg-transparent text-product-900 hover:bg-product-100",
  ghost:" text-product-900 bg-transperent border-none hover:text-product-500 "
};

const sizes: Record<ButtonSize, string> = {
  default: "min-h-14 p-4",
  compact: "px-4 py-2",
};

export default function LandingPageButton(props: ButtonProps) {
  const {
    children,
    className = "",
    disabled,
    href,
    onClick,
    size = "default",
    type = "button",
    variant = "primary",
  } = props;
  const classes = `inline-flex items-center justify-center rounded-xl text-base font-bold leading-6 tracking-button transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-product ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
