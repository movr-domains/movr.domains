import { useState, ChangeEvent, useRef, useEffect, FormEvent } from "react";
import useWallet from "@hooks/useWallet";
import UserID from "./user-id";

export default function ConnectWallet() {
  const [text, setText] = useState("");
  const inputTextRef = useRef(null);

  const { connectWallet, wallet, truncatedWallet } = useWallet();

  useEffect(() => {
    if (inputTextRef?.current) {
      // @ts-ignore
      inputTextRef.current.focus();
    }
  }, [inputTextRef]);

  // useEffect(() => {}, [text]);

  return (
    <div className="flex items-center space-x-2">
      {!wallet ? (
        <button
          onClick={connectWallet}
          className="uppercase border-green bg-black border-2 font-bold text-sm text-green rounded tracking-widest px-10 py-1 hover:bg-green hover:text-black transition-colors duration-300"
        >
          Connect Wallet
        </button>
      ) : (
        <span className="uppercase border-green border-2 font-bold text-sm rounded tracking-widest px-3 py-1 bg-green text-black transition-colors duration-300">
          {truncatedWallet}
        </span>
      )}
    </div>
  );
}
