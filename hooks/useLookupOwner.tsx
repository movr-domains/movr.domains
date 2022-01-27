import lookUpOwner from "@lib/look-up";
import { useEffect, useState } from "react";

interface Props {
  name: string;
}

export default function useLookupOwner({ name }: Props) {
  const [owner, setOwner] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      const owner = await lookUpOwner(name);
      setOwner(owner);
    }
    fetch();
  }, [name]);

  return { owner };
}
