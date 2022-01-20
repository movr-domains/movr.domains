import { Lookup, UserInfo } from "@components/user";
import ConnectWallet from "@components/user/connect-wallet";
import useWallet from "@hooks/useWallet";
import Image from "next/image";
import React from "react";

export default function Header() {
  const { wallet } = useWallet();
  return (
    <header>
      <div className="flex items-center space-x-5 py-4 justify-between container mx-auto">
        <div className="flex items-end space-x-5">
          <h1 className="text-6xl text-yellow uppercase font-bold">
            movr.domains
          </h1>
          <span className="text-green text-xl">v0.0.1</span>
        </div>
      </div>
      <div className="container mx-auto">
        <ConnectWallet />
        {wallet && (
          <React.Fragment>
            <UserInfo />
            <Lookup />
          </React.Fragment>
        )}
      </div>
    </header>
  );
}
