import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Session } from "next-auth";
import Image from "next/image";
import Navigation from "./navigation";

interface Props {
  user: NonNullable<Session["user"]>;
  signOut?: () => void;
}

function Avatar({ img }: { img: string }) {
  return (
    <div className="flex-shrink-0">
      <img className="h-6 w-6 rounded-full" src={img} alt="" />
    </div>
  );
}
export default function Header({ user, signOut }: Props) {
  const { name, image, email } = user;

  // const userPlaylists = [] as Result[];
  // const playlistQuery = await api.get<
  //   any,
  //   AxiosResponse<SearchResponse["playlists"]>
  // >("/me/playlists?limit=10", {
  //   headers: { Authorization: `Bearer ${accessToken}` },
  // });

  // if (userPlaylists) {
  //   playlistQuery.data.items.forEach((playlist) => {
  //     userPlaylists.push(playlistToResult(playlist));
  //   });
  // }

  return (
    <header className="px-12 bg-gray-900 top-0 fixed w-full h-16 flex justify-between items-center border-b-neutral-600 border-b z-50">
      {/* Left side */}
      <div className="flex justify-between items-center gap-20">
        <Image src="/artwork.jpeg" alt="logo" height={30} width={30} />
        <div className="flex items-center">
          <Navigation />
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-6">
        {/* <Search
        userPlaylists={userPlaylists.length > 0 ? userPlaylists : undefined}
        /> */}
        {image && (
          <div className="flex items-center relative">
            <DropdownMenu.Root modal={false}>
              <DropdownMenu.Trigger className="cursor-pointer">
                <Avatar img={image} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal />
              <DropdownMenu.Content
                className="bg-gray-900 absolute top-0 -translate-x-[100%] translate-y-[4px] px-4 py-2.5 flex flex-col gap-2 border border-neutral-900"
                sideOffset={5}
                side="bottom"
              >
                <DropdownMenu.Label className="text-sm font-bold opacity-50 max-w-[20ch] overflow-hidden text-ellipsis">
                  {name}
                </DropdownMenu.Label>
                {signOut && (
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
      </div>
    </header>
  );
}
