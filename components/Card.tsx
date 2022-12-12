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
    <Link href={`/${country.name?.common}`} className="card">
      <Image
        className="card-img"
        src={country.flags?.png}
        alt={`${country.name?.common}'s Flag`}
        width={320}
        height={160}
      />
      <div className="card-body">
        <h3 className="card-title">{country.name?.common}</h3>
        <p className="card-text">Population: {country.population}</p>
        <p className="card-text">Region: {country.region}</p>
        <p className="card-text">Capital: {country.capital}</p>
      </div>
    </Link>
  );
}
