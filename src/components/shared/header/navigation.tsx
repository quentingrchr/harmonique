"use client";

import routes from "@/constants/routes";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Item({
  label,
  href,
  isActive,
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  href: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn("color-white text-base hover:text-brand cursor-pointer", {
        "opacity-100 text-brand": isActive,
      })}
    >
      {label}
    </Link>
  );
}

const NavItems = [
  {
    label: "Home",
    href: routes.HOME,
  },
  {
    label: "About",
    href: routes.ABOUT,
  },
  {
    label: "Contact",
    href: routes.CONTACT,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  return (
    <div className="flex gap-6">
      {NavItems.map((item) => (
        <Item key={item.label} {...item} isActive={pathname === item.href} />
      ))}
    </div>
  );
}
