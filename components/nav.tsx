import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-gray-800">
      <ul className="flex items-center justify-between p-8">
        <li>
          <Link href="/">
            <a className="text-blue-300 no-underline">Online Classroom</a>
          </Link>
        </li>
        <ul className="flex items-center justify-between space-x-4 text-blue-300">
          <li>
            <Link href="/profile">
              <a className="no-underline btn-blue text-blue-300">Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a className="no-underline btn-blue">Search</a>
            </Link>
          </li>
        </ul>
      </ul>
    </nav>
  );
}
