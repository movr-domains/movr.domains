import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import DomainHeading from "@components/DomainHeading";
import lookUpOwner from "@lib/look-up";

export default function SearchResult() {
  const router = useRouter();
  const [nameOwner, setNameOwner] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      const owner = await lookUpOwner(
        Array.isArray(router?.query?.name)
          ? router.query.name[0]
          : router.query.name!
      );
      setNameOwner(owner);
    }
    fetch();
  }, [router.query.name]);

  if (!router.query.name) {
    return (
      <div>
        <h1>Oops Something went wrong</h1>
      </div>
    );
  }

  return (
    <main className="py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-yellow">Names</h1>
        <Link
          href={
            nameOwner
              ? `/domain/${router.query.name}`
              : `/domain/${router.query.name}/register`
          }
        >
          <a>
            <DomainHeading
              owner={nameOwner}
              name={
                Array.isArray(router.query.name)
                  ? router.query.name[0]
                  : router.query.name
              }
            />
          </a>
        </Link>
      </div>
    </main>
  );
}
