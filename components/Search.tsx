import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Country {
  name: {
    common: string;
  };
}

export default function Search({ setSearch }: { setSearch: Function }) {
  // const [people, setPeople] = useState<Person[]>([]);
  const [country, setCountry] = useState<Country[]>([]);
  const [selected, setSelected] = useState(country[0]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await res.json();
      setCountry(data);
    };
    fetchCountry();
    setSearch(query);
  }, [setSearch, query]);

  const filteredPeople =
    query === ""
      ? country
      : country.filter((country: Country) =>
          country.name.common
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full lg:w-96">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-14 pr-2 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
              placeholder="Search for a country..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-6">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
        </div>
      </Combobox>
    </div>
  );
}
