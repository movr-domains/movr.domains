import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";

export default function Lookup() {
  const [domainSearch, setDomainSearch] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const { push } = useRouter();

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="text-gray text-lg mt-5 space-y-3 border-b border-dashed border-gray pb-10">
      <p>Select a domain to manage it.</p>
      <p>Type a domain below to begin a new registration.</p>
      <p>
        <Link href="/faq">
          <a className="text-green">Help</a>
        </Link>
      </p>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          setError("");
          if (domainSearch.length <= 2) {
            setError("Domains must be 3 characters or more.");
            return;
          }
          push(`/domain/${domainSearch}`);
        }}
      >
        <input
          type="text"
          ref={inputRef}
          value={domainSearch}
          className="bg-gray caret-red-500 outline-none bg-opacity-20 w-full px-2 py-1 text-white"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDomainSearch(e.target.value)
          }
          placeholder="Lookup Domain..."
        />
      </form>
      <p className="text-[#ff0000]">{error}</p>
    </div>
  );
}
