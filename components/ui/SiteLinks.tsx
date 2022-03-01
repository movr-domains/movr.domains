import Link from "next/link";

export const links = [
  {
    name: "About",
    slug: "/about",
  },
  {
    name: "Docs",
    slug: "/docs",
  },
];

export default function SiteLinks() {
  return (
    <ul className="flex space-x-4">
      {links.map((link) => (
        <li key={link.slug}>
          <Link href={link.slug}>
            <a className="font-bold font-cabin hover:text-green transition duration-200 hover:underline">
              {link.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
