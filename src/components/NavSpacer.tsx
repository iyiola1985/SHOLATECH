"use client";

import { usePathname } from "next/navigation";

/** Reserves space under the fixed navbar on non-home pages. */
export default function NavSpacer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div className="h-[4rem] sm:h-[5.5rem] md:h-[6.5rem]" aria-hidden />;
}
