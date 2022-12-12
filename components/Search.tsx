import { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface Country {
  name: {
    common: string;
  };
}

export default function Search() {
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
  }, []);

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
    <div className="w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-10 pr-2 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none"
              placeholder="Search for a country..."
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((country: Country, index) => (
                  <Combobox.Option
                    key={index}
                    className="relative cursor-default select-none text-gray-900"
                    value={country.name.common}
                  >
                    <Link
                      href={`/${country.name.common}`}
                      className="w-full block h-full py-2 pl-10 pr-4 hover:bg-gray-100"
                    >
                      {country.name.common}
                    </Link>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
