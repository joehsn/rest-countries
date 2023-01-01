import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function Bad() {
  return (
    <div className="flex items-center justify-center w-screen h-screen text-red-500 bg-very-light-gray dark:bg-dark-blue-dm">
      <ExclamationTriangleIcon className="w-10 h-10 mr-3" />
      <span className="text-slate-900 dark:text-white">Bad Request.</span>
    </div>
  );
}
