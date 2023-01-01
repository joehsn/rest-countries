import React from "react";

type Props = {};

export default function NotFound({}: Props) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-300 dark:bg-dark-blue-dm">
      <h1 className="text-lg lg:text-9xl">404</h1>
    </div>
  );
}
