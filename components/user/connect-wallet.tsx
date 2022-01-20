import { useState, ChangeEvent, useRef, useEffect, FormEvent } from "react";
import useWallet from "@hooks/useWallet";
import UserID from "./user-id";

export default function ConnectWallet() {
  const [text, setText] = useState("");
  const inputTextRef = useRef(null);

  const { connectWallet, wallet, getSigner } = useWallet();

  useEffect(() => {
    if (inputTextRef?.current) {
      // @ts-ignore
      inputTextRef.current.focus();
    }
  }, [inputTextRef]);

  const handleSubmit = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
      if (text === "/connect") {
        // TODO: add connect to metamask hooks
        connectWallet();
      }
      return;
    }

    // connect wallet
    connectWallet();
  };

  // useEffect(() => {}, [text]);

  return (
    <main className="py-5">
      <div className="flex items-center space-x-2">
        <UserID />
        {!wallet && (
          <form onSubmit={handleSubmit}>
            <input
              ref={inputTextRef}
              type="text"
              value={text}
              className="bg-black caret-red-500 outline-none"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setText(e.target.value);
              }}
            />
          </form>
        )}
      </div>
    </main>
  );
}
