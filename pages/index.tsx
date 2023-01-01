import { useState } from "react";
import Head from "next/head";
import useSWR from "swr";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import Filter from "../components/Filter";
import Search from "../components/Search";
import Card from "../components/Card";
import axios from "axios";
import Layout from "../components/Layout";

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

export default function Home() {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

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
      <div className="flex items-center justify-center w-screen h-screen">
        <ArrowPathIcon className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );

  return (
    <>
      <Head>
        <title>Countries - @joehsn</title>
        <meta
          name="description"
          content="Generated by create next app with love by joehsn"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-between py-6 lg:py-12 search-bar lg:flex-row gap-y-4">
          <Search setSearch={setSearch} />
          <Filter setFilter={setFilter} />
        </div>
        <div className="min-h-screen pb-6 countries">
          <div className="grid grid-cols-1 grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 sm:gap-8 xl:gap-12">
            {data
              .sort((a: Country, b: Country) => {
                if (a.name.official < b.name.official) {
                  return -1;
                }
                if (a.name.official > b.name.official) {
                  return 1;
                }
                return 0;
              })
              .filter((country: Country) => {
                if (
                  country.name.official
                    .toLowerCase()
                    .includes(search.toLowerCase()) &&
                  filter === ""
                ) {
                  return country;
                } else if (
                  country.region.toLowerCase() === filter &&
                  country.name.official
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ) {
                  return country;
                }
              })
              .map((country: Country, index: number) => {
                return <Card key={index} country={country} />;
              })}
          </div>
        </div>
      </Layout>
    </>
  );
}
