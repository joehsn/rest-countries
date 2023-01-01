import { useState, useEffect } from "react";
import MagnifyingGlassIcon from "@heroicons/react/20/solid/MagnifyingGlassIcon";
import { Combobox } from "@headlessui/react";

export default function Search({ setSearch }: { setSearch: Function }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSearch(query);
  }, [setSearch, query]);

  return (
    <div className="relative w-full bg-transparent lg:w-96">
      <div className="relative w-full overflow-hidden text-left bg-transparent rounded-lg shadow-md cursor-pointer sm:text-sm">
        <input
          className="w-full py-2 pl-12 pr-3 text-sm bg-white border-none cursor-pointer text-very-dark-blue dark:text-white dark:bg-dark-blue-dm focus:ring-0 focus:outline-none focus:cursor-text"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for a country..."
        />
        <MagnifyingGlassIcon
          className="absolute inset-y-0 w-5 h-5 text-gray-400 -translate-y-1/2 pointer-events-none left-4 top-1/2"
          aria-hidden="true"
        />
        <button className="flex items-center "></button>
      </div>
    </div>
  );
}
