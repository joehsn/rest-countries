import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
  capital: string;
}

export default function Card({ country }: { country: Country }) {
  return (
    <Link
      href={`/${country.name?.common}`}
      className="rounded shadow-md bg-white dark:bg-dark-blue-dm overflow-hidden"
    >
      <Image
        className="aspect-[3/2] w-full"
        src={country.flags?.png}
        alt={`${country.name?.common}'s Flag`}
        width={320}
        height={160}
        priority
      />
      <div className="p-4">
        <h3 className="mb-4 text-xl font-extrabold">{country.name?.common}</h3>
        <p className="card-text font-semibold">
          Population:{" "}
          <span className="font-light">
            {country.population.toString().replace(/(.)(?=(\d{3})+$)/g, "$1,")}
          </span>
        </p>
        <p className="card-text font-semibold">
          Region: <span className="font-light">{country.region}</span>
        </p>
        <p className="card-text font-semibold">
          Capital: <span className="font-light">{country.capital}</span>
        </p>
      </div>
    </Link>
  );
}
