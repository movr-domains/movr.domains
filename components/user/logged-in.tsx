import UserInfo from "./user-info";
import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";

export default function LoggedIn() {
  const [userInput, setUserInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef?.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="p-5 space-y-5">
      <UserInfo />
      <Instruction />
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            ref={inputRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUserInput(e.target.value);
            }}
            value={userInput}
            className="bg-black caret-red-500 outline-none"
          />
        </form>
      </div>
    </section>
  );
}

function Instruction() {
  return (
    <div className="text-gray-600">
      <p>Click a domain to manage it.</p>
      <p>Type /dc to disconnect wallet</p>
      <p>Type a domain below to being a new registration.</p>
    </div>
  );
}
