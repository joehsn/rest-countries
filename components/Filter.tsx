import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const filter = [
  { name: "all" },
  { name: "africa" },
  { name: "americas" },
  { name: "asia" },
  { name: "europe" },
  { name: "oceania" },
];

export default function FilterComponent({
  setFilter,
}: {
  setFilter: (filter: string) => void;
}) {
  const [selected, setSelected] = useState(filter[0]);

  useEffect(() => {
    if (selected.name !== "all") {
      setFilter(selected.name);
    } else {
      setFilter("");
    }
  }, [setFilter, selected]);

  return (
    <div className="w-full lg:w-48">
      {/*<Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 dark:bg-dark-blue-dm ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filter.map((region, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 dark:text-white dark:hover:text-teal-700 ${
                      active
                        ? "bg-teal-100 text-teal-700 dark:text-white"
                        : "text-gray-900 dark:text-white"
                    }`
                  }
                  value={region}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate capitalize ${
                          selected
                            ? "font-medium dark:text-slate-900"
                            : "font-normal"
                        }`}
                      >
                        {region.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox> */}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-4 pr-10 text-left bg-white rounded-lg shadow-md cursor-pointer dark:bg-dark-blue-dm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
            <span className="block capitalize truncate dark:text-white">
              {selected.name === "all" ? "Filter: By Region" : selected.name}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDownIcon
                className="w-5 h-5 text-gray-400 dark:text-gray-300"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-64 dark:bg-dark-blue-dm ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filter.map((country, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 capitalize ${
                      active
                        ? "bg-cyan-100 text-very-dark-blue"
                        : "text-very-dark-blue dark:text-white"
                    }`
                  }
                  value={country}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {country.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-800">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
