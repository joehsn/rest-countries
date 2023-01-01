import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Country {
  name: {
    official: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  capital: string;
}

export default function Card({ country }: { country: Country }) {
  return (
    <Link
      href={`/${country.name?.official.toLowerCase()}`}
      className="h-full rounded shadow-lg bg-white dark:bg-dark-blue-dm overflow-hidden"
    >
      <Image
        className="aspect-video object-cover w-full shadow-md"
        src={country.flags?.svg}
        alt={`${country.name?.official}'s Flag`}
        width={320}
        height={160}
        priority
      />
      <div className="p-4">
        <h3 className="mb-4 font-extrabold">{country.name?.official}</h3>
        <div className="space-y-1">
          <p className="text-sm font-semibold">
            Population:{" "}
            <span className="font-light">
              {country.population
                .toString()
                .replace(/(.)(?=(\d{3})+$)/g, "$1,")}
            </span>
          </p>
          <p className="text-sm font-semibold">
            Region: <span className="font-light">{country.region}</span>
          </p>
          <p className="text-sm font-semibold">
            Capital:{" "}
            <span className="font-light">
              {country.capital ? country.capital : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}
