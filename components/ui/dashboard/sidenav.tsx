"use client";

import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import NavLinks from '@/components/ui/dashboard/nav-links';
import { useTheme } from "next-themes";
import clsx from "clsx";

export default function SideNav() {
  const { theme } = useTheme();

  return (
    <div className={clsx("flex h-full flex-col px-3 py-4 md:px-2", {
      "dark:bg-gray-900": theme === "dark",
    })}>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block dark:bg-gray-800"></div>
      </div>
    </div>
  );
}