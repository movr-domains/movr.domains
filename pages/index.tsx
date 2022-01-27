import NavLinks from "@components/ui/nav-links";
import { Lookup } from "@components/user";
import ConnectWallet from "@components/user/connect-wallet";
import useWallet from "@hooks/useWallet";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { wallet, connectWallet } = useWallet();
  const { push } = useRouter();

  return (
    <main className="h-screen flex items-center bg-opacity-100">
      <div className="fixed top-0 w-full left-0">
        <div className="container mx-auto">
          <div className="py-3 flex justify-between text-white">
            <ConnectWallet />
            <NavLinks />
          </div>
        </div>
      </div>
      <div className="max-w-xl mx-auto bg-opacity-40 p-16 rounded">
        <div className="">
          <div className="mb-2">
            <code className="text-xs uppercase text-center block">
              {process.env.NODE_ENV === "production"
                ? "production"
                : process.env.NODE_ENV === "test"
                ? "staging"
                : "development"}
            </code>
            <div className="px-4">
              <Image
                src="/mdr-logos/movr_full_white.png"
                height="250px"
                width="1853px"
                alt="MOVR Domain Registry Logo"
                priority
              />
            </div>
          </div>
          <Lookup />
        </div>
      </div>
    </main>
  );
}
