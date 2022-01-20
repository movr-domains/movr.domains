import useWallet from "@hooks/useWallet";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { wallet, connectWallet } = useWallet();
  const { push } = useRouter();

  return (
    <main>
      {!wallet && (
        <span className="text-red-500">
          Error: Type /connect to connect wallet or{" "}
          <span
            className="cursor-pointer hover:text-white transition duration-200"
            onClick={() => connectWallet()}
          >
            click here
          </span>
        </span>
      )}
    </main>
  );
}
