import useLookupOwner from "@hooks/useLookupOwner";
import useWallet from "@hooks/useWallet";
import addresses from "constants/contracts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PublicResolver from "@lib/abis/PublicResolver.json";
import ReverseRegistrar from "@lib/abis/ReverseRegistrar.json";
import { ethers } from "ethers";
import contractLog from "@lib/dev/console-contract";
import { moonbeamDevProvider } from "@lib/providers";
import getName from "@lib/get-name";
import Link from "next/link";
import { useForm } from "react-hook-form";

const textDataFields = [
  "email",
  "url",
  "avatar",
  "description",
  "notice",
  "keywords",
  "com.twitter",
  "com.github",
];

export default function DomainPage() {
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  const name = Array.isArray(router?.query?.name)
    ? router.query.name[0]
    : router.query.name!;

  const { owner } = useLookupOwner({ name });
  const { wallet, getSigner } = useWallet();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!wallet) {
      console.log("Wallet not connected");
      return;
    }

    setIsOwner(wallet === owner);
  }, [wallet, owner]);

  const setNameAsPrimary = async () => {
    const signer = await getSigner();
    const reverseRegistrar = new ethers.Contract(
      addresses.reverseRegistrar,
      ReverseRegistrar.abi,
      signer
    );

    const set = await reverseRegistrar.setName(
      Array.isArray(router?.query?.name)
        ? router.query.name[0]
        : router.query.name!
    );
    await set.wait();
  };

  const setTextData = async (values: any) => {
    console.log(values);
  };

  return (
    <div>
      {isOwner ? (
        <div className="mt-4 max-w-2xl mx-auto">
          <h3 className="text-2xl text-yellow font-bold">
            {router.query.name}.movr
          </h3>
          <div className="mt-3">
            <button
              onClick={setNameAsPrimary}
              className="bg-green font-bold px-4 py-1 text-black uppercase"
            >
              Set as primary MDR name
            </button>
          </div>
          <div className="mt-3">
            <form onSubmit={handleSubmit(setTextData)}>
              <h2 className="text-3xl font-bold uppercase mt-10 mb-2">
                Set Text Records
              </h2>
              <div className="space-y-3">
                {textDataFields.map((field, i) => (
                  <div key={i}>
                    <label>
                      {field.toUpperCase()}
                      <input
                        type="text"
                        {...register(field)}
                        placeholder={field}
                        className="w-full bg-black border border-zinc-700 py-1 px-3"
                        autoComplete="off"
                      />
                    </label>
                  </div>
                ))}
              </div>
              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
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
      )}
    </div>
  );
}
