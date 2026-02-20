import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

const base =
  "inline-flex items-center justify-center rounded-xl font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary:
    "bg-amber-500 text-white shadow-md hover:bg-amber-600 focus-visible:outline-amber-500",
  secondary:
    "bg-slate-800 text-white shadow-md hover:bg-slate-700 focus-visible:outline-slate-800",
  outline:
    "border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white focus-visible:outline-slate-800",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
