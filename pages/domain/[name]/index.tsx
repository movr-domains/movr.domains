import useLookupOwner from "@hooks/useLookupOwner";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Web3Context from "@components/wallet/context";
import { checkIfAvailable } from "@lib/contract";

export default function DomainPage() {
  const router = useRouter();
  const name = Array.isArray(router?.query?.name)
    ? router.query.name[0]
    : router.query.name!;

  const { owner } = useLookupOwner({ name });
  const { state } = useContext(Web3Context);
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAvailable() {
      const isAvailable = await checkIfAvailable(name);
      if (isAvailable) {
        router.push(`/domain/${name}/register`);
        return;
      }
      setAvailable(isAvailable);
    }
    checkAvailable();
  }, [name, router]);

  useEffect(() => {
    if (!state.address) {
      console.log("Wallet not connected");
      return;
    }

    if (state.address === owner?.toLowerCase()) {
      router.push(`/domain/${name}/manage`);
    }
  }, [state.address, owner, router, name]);

  return (
    <div>
      {available === null ? (
        <div className="wrapper px-14">
          <div className="col-start-3 col-span-8">
            <p>Loading</p>
          </div>
        </div>
      ) : !available ? (
        <div className="wrapper px-14">
          <div className="col-start-3 col-span-8">
            <h3 className="text-2xl text-red-500 font-bold mt-4 uppercase">
              {router.query.name}.movr is not availble
            </h3>
            <p>Search again</p>
          </div>
        </div>
      ) : available ? (
        <div className="wrapper">
          <div className="col-span-12 ">
            <h3 className="text-2xl text-yellow font-bold mt-4">
              {router.query.name}.movr is availble
            </h3>
            <p>This name is availble for regiration</p>
            <div className="flex">
              <Link href={`/domain/${router.query.name}/register`}>
                <a className="btn">Register Now</a>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="wrapper px-14">
          <div className="col-start-3 col-span-8">
            <h3 className="text-2xl text-blue-500 font-bold mt-4 uppercase">
              Loading
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
