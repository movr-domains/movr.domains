import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsTwitter } from "react-icons/bs";

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>MOVR Domains</title>
      </Head>
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="mb-2">
            <Image
              src="/logo.png"
              height="109px"
              width="800px"
              alt="MOVR Domains Logo"
              priority
            />
          </div>
          <div className="text-lg">
            <p className="text-xl font-bold uppercase text-yellow">
              Mapping the Kusama and Polkadot ecosystems
            </p>
            <p className="text-gray-300 uppercase text-base">
              Names to the numbers
            </p>
            <div className="mt-10">
              <span className="uppercase">Arriving</span>
              <h2 className="text-8xl font-bold">June 2022</h2>
            </div>
          </div>
          <div className="flex items-center">
            <div className="mx-auto">
              <img src="/animated.png" width="175" height="280" />
            </div>
          </div>
        </div>
        <div className="fixed bottom-10 right-10 text-3xl">
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://twitter.com/MOVRDOMAINS"
                rel="noreferrer"
                target="_blank"
              >
                <BsTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://app.subsocial.network/6168"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  src="/subsocial.png"
                  height="35px"
                  width="35px"
                  alt="Sub Social icon"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
