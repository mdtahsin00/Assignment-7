"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode } from "react";
import { authClient } from "../../lib/auth-client";

interface ProductCardLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

// Card wrapper used by the home page sections (Price, DownPrice, AllProduct).
// Logged in → open the product detail page; logged out → /sign-up.
export default function ProductCardLink({
  href,
  className,
  children,
}: ProductCardLinkProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleCardClick = (e: MouseEvent) => {
    // Session still loading — block navigation instead of guessing.
    if (isPending) {
      e.preventDefault();
      return;
    }
    // Not logged in → go to sign-up instead of the detail page.
    if (!session) {
      e.preventDefault();
      router.push("/sign-up");
    }
  };

  return (
    <Link href={href} onClick={handleCardClick} className={className}>
      {children}
    </Link>
  );
}
