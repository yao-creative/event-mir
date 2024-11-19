"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Dashboard", href: "/protected", icon: HomeIcon },
  {
    name: "Events",
    href: "/protected/events",
    icon: DocumentDuplicateIcon,
  },
  { name: "Profile", href: "/protected/profile", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
                'dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700': theme === 'dark',
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}