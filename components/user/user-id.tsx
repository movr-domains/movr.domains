import useWallet from "../../hooks/useWallet";

export default function UserID() {
  const { wallet, truncatedWallet } = useWallet();
  return (
    <p className="tracking-wider text-xl">
      C:\USERS\{wallet ? <span>{truncatedWallet}</span> : <span>{"...>"}</span>}
    </p>
  );
}
