import DomainList from "./domain-list";

export default function UserInfo() {
  return (
    <div>
      <h1 className="text-xl mb-8">Registered Domains:</h1>
      <div className="uppercase">
        <DomainList />
      </div>
    </div>
  );
}
