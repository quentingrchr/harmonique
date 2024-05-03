"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cn from "classnames";
import { Session } from "next-auth";
import Image from "next/image";
import NextLink from "next/link";
import Navigation from "./navigation";
import Search from "./search";

interface Props {
  user?: NonNullable<Session["user"]>;
  signOut?: () => void;
  signIn?: () => void;
  transparent?: boolean;
}

function Avatar({ img }: { img: string }) {
  return (
    <div className="flex-shrink-0">
      <img className="h-6 w-6 rounded-full" src={img} alt="" />
    </div>
  );
}
export default function Header({ user, signOut, signIn, transparent }: Props) {
  return (
    <header
      className={cn(
        "px-12 top-0 fixed w-full h-16 flex justify-between items-center b z-50",
        {
          "bg-gray-950 border-b-neutral-600 border-b": !transparent,
          "bg-transparent": transparent,
        }
      )}
    >
      {/* Left side */}
      <div className="flex justify-between items-center gap-10">
        <NextLink href="/" passHref>
          <Image
            src="/logo-harmonique.png"
            alt="logo"
            className="translate-y-[1px]"
            objectFit="contain"
            width={78}
            height={12}
          />
        </NextLink>
        <div className="flex items-center">
          <Navigation />
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Search />
            {user.image && (
              <div className="flex items-center relative">
                <DropdownMenu.Root modal={false}>
                  <DropdownMenu.Trigger className="cursor-pointer">
                    <Avatar img={user.image} />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal />
                  <DropdownMenu.Content
                    className="bg-gray-800 absolute top-0 -translate-x-[100%] translate-y-[4px] px-4 py-2.5 flex flex-col gap-2 z-50 rounded-md"
                    sideOffset={5}
                    side="bottom"
                  >
                    <DropdownMenu.Label className="text-sm font-bold opacity-50 max-w-[20ch] overflow-hidden text-ellipsis">
                      {user.name}
                    </DropdownMenu.Label>
                    {signOut !== undefined && (
                      <DropdownMenu.Item className="text-sm md:whitespace-nowrap">
                        <button onClick={signOut}>Sign out</button>
                      </DropdownMenu.Item>
                    )}

                    <DropdownMenu.Group>
                      <DropdownMenu.Item />
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            )}
          </>
        ) : (
          <button
            className="cursor-pointer flex gap-2 justify-center items-center"
            onClick={() => signIn && signIn()}
          >
            Log in
            <Image
              src="/spotify-guideline-logo.png"
              alt="spotify logo"
              className="w-4 h-4"
              width={16}
              height={16}
            />
          </button>
        )}
      </div>
    </header>
  );
}
