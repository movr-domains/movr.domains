import namehash from "eth-ens-namehash";

export default function AccountPage() {
  return (
    <div>
      <h1>Account Page</h1>
      {namehash.hash("nat3.eth")}
    </div>
  );
}
