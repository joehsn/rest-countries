import style from "./singlePage.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";

interface Country {
  name: {
    common: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  flags: {
    png: string;
  };
  currencies: {
    name: string;
  }[];
  languages: {
    name: string;
  }[];
  borders: string[];
}

export default function SinglePage() {
  const [countryDetails, setCountryDetails] = useState<Country[]>([]);
  const router = useRouter();
  const { country } = router.query;

  useEffect(() => {
    const fetchCountry = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      // const countries = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await res.json();
      // const countriesData = await countries.json();
      console.log(data);
      // console.log(countriesData);

      setCountryDetails(data);
    };
    fetchCountry();
  }, [country]);

  return (
    <>
      <Head>
        <title>{country}</title>
      </Head>
      <Nav />
      <main className={style.country}>
        <Link href="/">
          <span>Back</span>
        </Link>
        <h1>{countryDetails[0]?.name.common}</h1>
        <Image
          src={countryDetails[0]?.flags.png}
          alt={countryDetails[0]?.name.common}
          width={320}
          height={160}
        />
        <p>Population: {countryDetails[0]?.population}</p>
        <p>Region: {countryDetails[0]?.region}</p>
        <p>Sub Region: {countryDetails[0]?.subregion}</p>
        <p>Capital: {countryDetails[0]?.capital}</p>
        {/* <p>
          Currencies:{" "}
          {currencies.map((currency) => (
            <span key={currency.name}>{currency.name}</span>
          ))}
        </p>
        <p>
          Languages:{" "}
          {languages.map((language) => (
            <span key={language.name}>{language.name}</span>
          ))}
        </p>
        <p>
          Borders:{" "}
          {borders.map((border) => (
            <span key={border}>{border}</span>
          ))}
        </p> */}
      </main>
      <footer></footer>
    </>
  );
}
