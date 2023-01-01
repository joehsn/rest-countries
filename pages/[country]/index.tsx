import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  ArrowLongLeftIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { Fragment } from "react";
import Layout from "../../components/Layout";

interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: { official: string };
    };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  flags: {
    svg: string;
  };
  tld: Array<String>;
  currencies: {
    [key: string]: {
      name: string[];
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: Array<string>;
  cioc: string;
  cca3: string;
  ccn3: string;
  cca2: string;
}

export default function SinglePage() {
  const router = useRouter();
  const { country } = router.query;
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `https://restcountries.com/v3.1/all`,
    fetcher
  );

  if (error)
    return (
      <div className="flex items-center justify-center w-screen h-screen text-red-500 bg-very-light-gray dark:bg-dark-blue-dm">
        <ExclamationTriangleIcon className="w-10 h-10 mr-3" />
        <span className="text-slate-900 dark:text-white">
          Something went wrong.
        </span>
      </div>
    );
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-very-light-gray dark:bg-dark-blue-dm">
        <ArrowPathIcon className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );

  return (
    <>
      <Head>
        <title className="capitalize">
          {data
            .map((c: Country) => c.name.official.toLowerCase())
            .includes(country as string)
            ? data
                .filter((c: Country) =>
                  c.name.official.toLowerCase() === country
                    ? c.name.official
                    : ""
                )
                .map((c: Country) => c.name.official)
            : "No Country Found"}{" "}
          - @joehsn
        </title>
      </Head>
      <Layout>
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center px-8 py-2 my-8 space-x-2 bg-white rounded-md lg:my-16 w-36 shadow-back-link text-very-dark-blue dark:text-white dark:bg-dark-blue-dm"
        >
          <ArrowLongLeftIcon className="w-5 h-5" />
          <span>Back</span>
        </button>
        {data
          .map((c: Country) => c.name.official.toLowerCase())
          .includes(country as string) ? (
          data
            .filter((c: Country) => {
              if (c.name.official.toLowerCase() === country) {
                return c;
              }
            })
            .map((country: Country, index: number) =>
              country ? (
                <div
                  key={country.name.common}
                  className="flex flex-col items-center justify-between w-full mb-8 lg:mb-16 lg:flex-row"
                >
                  <Image
                    className="object-cover w-full lg:w-2/5 aspect-[3/2] mb-8 lg:mb-0"
                    src={country.flags.svg}
                    alt={`${country.name.common}'s flag`}
                    width={320}
                    height={160}
                    priority
                  />
                  <div className="flex flex-col items-start w-full space-y-6 lg:w-1/2">
                    <h1 className="text-3xl font-extrabold">
                      {country.name.common}
                    </h1>
                    <div className="flex flex-wrap w-full font-semibold">
                      <div className="flex flex-col w-full space-y-2 lg:w-1/2">
                        <p>
                          Native name:{" "}
                          <span className="font-light text-dark-gray dark:text-very-light-gray">
                            {country.name.common}
                          </span>
                        </p>
                        <p>
                          Population:{" "}
                          <span className="font-light text-dark-gray dark:text-very-light-gray">
                            {country.population
                              .toString()
                              .replace(/(.)(?=(\d{3})+$)/g, "$1,")}
                          </span>
                        </p>
                        <p>
                          Region:{" "}
                          <span className="font-light text-dark-gray dark:text-very-light-gray">
                            {country.region}
                          </span>
                        </p>
                        <p>
                          Sub Region:{" "}
                          <span className="font-light text-dark-gray dark:text-very-light-gray">
                            {country.subregion ? country.subregion : "N/A"}
                          </span>
                        </p>
                        <p>
                          Capital:{" "}
                          <span className="font-light text-dark-gray dark:text-very-light-gray">
                            {country.capital ? country.capital : "N/A"}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col w-full space-y-2 lg:w-1/2">
                        <p>
                          Top Level Domain:{" "}
                          <span className="font-light text-dark-gray dark:text-very-light-gray">
                            {country.tld[0]}
                          </span>
                        </p>
                        <p>
                          Currencies:{" "}
                          <span className="space-x-1 font-light text-dark-gray dark:text-very-light-gray">
                            {country.currencies
                              ? Object.keys(country.currencies).map(
                                  (currency) => (
                                    <span
                                      key={currency}
                                      className="relative inline-block [&:not(:last-of-type)]:after:content-[','] [&:not(:last-of-type)]:after:inline-block"
                                    >
                                      {country.currencies[currency].name}
                                    </span>
                                  )
                                )
                              : "No Currencies specified"}
                          </span>
                        </p>
                        <p>
                          Languages:{" "}
                          <span className="space-x-1 font-light text-dark-gray dark:text-very-light-gray">
                            {country.languages
                              ? Object.keys(country.languages)
                                  .sort()
                                  .map((language, i) => (
                                    <span
                                      key={i}
                                      className="relative inline-block [&:not(:last-of-type)]:after:content-[','] [&:not(:last-of-type)]:after:inline-block"
                                    >
                                      {country.languages[language]}
                                    </span>
                                  ))
                              : "No languages specified"}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center w-full gap-2">
                      <p className="font-semibold">Border Countries:</p>
                      <div
                        className={`flex flex-wrap gap-2${
                          country.borders ? " w-full sm:w-auto" : ""
                        }`}
                      >
                        {country.borders
                          ? country.borders.map((border) => {
                              return (
                                <Fragment key={border}>
                                  {data
                                    .filter((c: Country) => {
                                      if (
                                        c.cioc === border ||
                                        c.cca3 === border ||
                                        c.cca2 === border ||
                                        c.ccn3 === border
                                      ) {
                                        return c;
                                      }
                                    })
                                    .map((c: Country) => (
                                      <Link
                                        key={c.name.official}
                                        href={`/${c.name.official.toLowerCase()}`}
                                        className="w-[30%] sm:px-4 py-1 text-sm bg-white rounded-md shadow-lg sm:w-auto text-very-dark-blue dark:text-white dark:bg-dark-blue-dm text-center overflow-hidden overflow-ellipsis whitespace-nowrap"
                                      >
                                        {c.name.common}
                                      </Link>
                                    ))}
                                </Fragment>
                              );
                            })
                          : "No borders"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  <h1 className="text-3xl font-extrabold">Country not found</h1>
                  <Link
                    href="/"
                    className="px-4 py-1 mt-4 text-sm text-center bg-white rounded-md shadow-lg sm:w-auto text-very-dark-blue dark:text-white dark:bg-dark-blue-dm"
                  >
                    Go back
                  </Link>
                </div>
              )
            )
        ) : (
          <div className="flex flex-col items-center justify-center w-full mb-16 text-yellow-400 lg:flex-row">
            <GlobeEuropeAfricaIcon className="w-64 h-64 mr-3 lg:w-96 lg:h-96" />
            <span className="font-mono text-3xl text-slate-900 dark:text-white lg:text-9xl">
              No Country Found.
            </span>
          </div>
        )}
      </Layout>
    </>
  );
}
