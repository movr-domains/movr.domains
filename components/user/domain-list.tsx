import Link from "next/link";

const names = ["Mach.movr", "Machiavelli.rome", "Machiavelli.sempronia"];

export default function DomainList() {
  return (
    <ul className="">
      {names.map((name) => (
        <li key={name}>
          <Domain name={name} />
        </li>
      ))}
    </ul>
  );
}

function Domain({ name }: { name: string }) {
  return (
    <Link href={`/domain/${name}`}>
      <a className="font-bold text-lg hover:text-green transition-colors duration-200">
        {name}
      </a>
    </Link>
  );
}
