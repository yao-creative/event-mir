// components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold"><Link href="/">Logo</Link></h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            Filter
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
