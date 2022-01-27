import Link from "next/link";

export const links = [
  {
    name: "Account",
    slug: "/account",
  },
  {
    name: "About",
    slug: "/about",
  },
];

export default function NavLinks() {
  return (
    <ul className="flex space-x-3">
      {links.map((link) => (
        <li key={link.slug}>
          <Link href={link.slug}>
            <a>{link.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
