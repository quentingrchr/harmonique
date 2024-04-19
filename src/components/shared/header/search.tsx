// "use client";
// import useApi from "@/hooks/useApi";
// import api from "@/lib/spotify-api/api";
// import { Result, aggregateResults } from "@/lib/spotify-api/search";
// import { SearchResponse } from "@/lib/spotify-api/types";
// import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// import { AxiosResponse } from "axios";
// import cn from "classnames";
// import React, { useEffect } from "react";
// import data from "../music-collection/fakedata";
// import { Input } from "../ui/Input";

// function ResultList({
//   results,
//   headerText,
// }: {
//   results: Result[];
//   headerText?: string;
// }) {
//   if (results.length === 0) {
//     return <NoResults />;
//   }
//   return (
//     <ul className="flex flex-col gap-3 px-2 py-4">
//       {headerText && (
//         <li>
//           <p className="text-sm text-neutral-400">{headerText}</p>
//         </li>
//       )}

//       {results.map((item) => (
//         <li key={item.id} className="relative">
//           <a href={`#${item.id}`} className="absolute inset-0"></a>
//           <div className="flex items-center space-x-2">
//             <img
//               src={item.cover.url}
//               alt={item.title}
//               className="h-7 w-7 rounded-full"
//             />
//             <div>
//               <p className="text-sm font-medium">{item.title}</p>
//               {item.type === "track" ? (
//                 <p className="text-xs text-muted-text">{item.artist}</p>
//               ) : (
//                 <p className="text-xs text-muted-text capitalize">
//                   {item.type}
//                 </p>
//               )}
//             </div>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

// function NoResults() {
//   return (
//     <div className="flex flex-col gap-3 px-2 py-4 justify-center h-12">
//       <p className="text-sm text-neutral-400">No matches found</p>
//     </div>
//   );
// }

// export default function Search({
//   userPlaylists,
// }: {
//   userPlaylists?: Result[];
// }) {
//   const input = React.useRef<HTMLInputElement>(null);
//   const [isFocused, setIsFocused] = React.useState(false);
//   const [search, setSearch] = React.useState("");
//   const [results, setResults] = React.useState<Result[]>([]);

//   const searchQuery = useApi<[string], AxiosResponse<SearchResponse>, any>(
//     ["search"],
//     async (_, token) => {
//       return api.get(
//         `/search?q=${search}&type=album%2Cplaylist%2Ctrack%2Cartist&limit=2`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//     },
//     {
//       enabled: false,
//     }
//   );

//   useEffect(() => {
//     if (search && search.length > 0) {
//       searchQuery.refetch();
//     } else {
//       setResults([]);
//     }
//   }, [search]);

//   useEffect(() => {
//     if (!searchQuery.data) return;
//     const results = aggregateResults(searchQuery.data.data, search);
//     setResults(results);
//   }, [searchQuery.data]);

//   useEffect(() => {
//     console.log(searchQuery.data, "searchQuery.data");
//     if (!searchQuery.data) return;
//   }, [searchQuery.data]);

//   useEffect(() => {
//     console.log("results", results);
//   }, [results]);

//   return (
//     <div className="relative">
//       <div
//         className={cn(
//           "bg-gray-700 flex grap-2 items-center px-2 rounded min-w-[300px]"
//         )}
//       >
//         <MagnifyingGlassIcon
//           className={cn("h-4 w-4 ", {
//             "text-brand": isFocused,
//             "text-neutral-400": !isFocused,
//           })}
//         />
//         <Input
//           onFocus={() => {
//             setIsFocused(true);
//           }}
//           onClick={async () => {
//             console.log(data);
//           }}
//           onBlur={() => setIsFocused(false)}
//           ref={input}
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//           }}
//           placeholder="Search"
//           className="ring-transparent"
//         />
//       </div>
//       {isFocused && (
//         <div className="relative">
//           <div className="top-0 absolute bg-gray-700 w-full">
//             <span className="w-[90%] m-auto flex border-t-[1px] border-t-neutral-600"></span>
//             {search.length === 0 &&
//             userPlaylists &&
//             userPlaylists.length > 0 ? (
//               <ResultList
//                 results={userPlaylists || []}
//                 headerText="Your playlists"
//               />
//             ) : (
//               <ResultList results={results} />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
