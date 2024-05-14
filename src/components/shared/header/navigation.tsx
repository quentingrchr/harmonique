"use client";

import { headerNavigation } from "@/constants/navigation";
import { Bars3Icon } from "@heroicons/react/20/solid";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Item(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    label: string;
    href: string;
    isActive?: boolean;
  }
) {
  const { label, href, isActive, ...rest } = props;
  return (
    <Link
      href={href}
      className={cn("color-white text-base hover:text-brand cursor-pointer", {
        "opacity-100 text-brand": isActive,
      })}
      {...rest}
    >
      {label}
    </Link>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  return (
    <>
      <div className="md:flex gap-6 hidden">
        {headerNavigation.map((item) => (
          <Item key={item.label} {...item} isActive={pathname === item.href} />
        ))}
      </div>
      <div className="md:hidden flex gap-6">
        <BurgerNavigationMenu path={pathname} />
      </div>
    </>
  );
}

function BurgerNavigationMenu({ path }: { path: string }) {
  return (
    <NavigationMenu.Root className="">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex justify-center items-center">
            <Bars3Icon className="color-white size-6 " />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="bg-gray-800  absolute p-4 px-6 rounded-md shadow-xl z-40 top-8">
            <ul className="List one">
              <li className="grid gap-4">
                {headerNavigation.map((item) => (
                  <NavigationMenu.Link asChild>
                    <Item
                      key={item.label}
                      {...item}
                      isActive={path === item.href}
                    />
                  </NavigationMenu.Link>
                ))}
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      {/* <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div> */}
    </NavigationMenu.Root>
  );
}
