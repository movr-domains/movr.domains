import ConnectWallet from "@components/user/connect-wallet";
import useWallet from "@hooks/useWallet";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import NavLinks from "./nav-links";
import { links as navLinks } from "./nav-links";

const fakeDomains = ["nate", "nat3", "caity", "natelook", "ayte"];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { wallet, truncatedWallet, mdrName } = useWallet();
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setDropdownOpen(false);
    });
  }, [router]);

  return (
    <React.Fragment>
      <header className="bg-black border-zinc-700 border-b relative z-40 ">
        <div className="flex items-center space-x-5 justify-between container mx-auto">
          <div className="w-auto h-full">
            <Link href="/">
              <a>
                <img src="/logo.png" height="31.9px" width="238.9px" alt="" />
              </a>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <ul className="nav-links flex items-center">
              {wallet && (
                <React.Fragment>
                  {navLinks.map((link) => (
                    <li key={link.slug}>
                      <Link href={link.slug}>
                        <a>{link.name}</a>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      className={classNames(
                        "space-x-1 transition duration-200",
                        {
                          "text-green": dropdownOpen,
                        }
                      )}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span>Owned Domains</span>
                      <motion.span
                        animate={{ rotate: !dropdownOpen ? 0 : -180 }}
                        transition={{ type: "tween", duration: 0.2 }}
                      >
                        <BsChevronDown />
                      </motion.span>
                    </button>
                  </li>
                </React.Fragment>
              )}
              {wallet ? (
                <li>
                  <button className="flex flex-col">
                    {mdrName && (
                      <span className="text-sm text-yellow leading-0">
                        {mdrName}
                      </span>
                    )}
                    <span className="text-xs">{truncatedWallet}</span>
                  </button>
                </li>
              ) : (
                <li>
                  <button>No Wallet</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </header>
      <motion.div
        initial={{ y: -150 }}
        animate={{ y: dropdownOpen ? 0 : -150 }}
        transition={{ type: "tween", duration: 0.2 }}
        className="fixed w-full z-30"
      >
        <div className="bg-neutral-900 border-b border-zinc-700 flex items-center h-20">
          <div className="container mx-auto">
            <div>
              <h5 className="font-bold text-lg text-yellow uppercase">
                My Domains
              </h5>
              <ul className="flex space-x-4 nav-dropdown-links">
                {fakeDomains.map((domain, i) => (
                  <li key={i}>
                    <Link href={`/domain/${domain}`}>
                      <a>{domain}.movr</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}
