import shortenHex from "@lib/shorten-hex";
import cn from "classnames";

interface DomainHeadingProps {
  owner: null | string;
  name: string | undefined;
}

export default function DomainHeading({ owner, name }: DomainHeadingProps) {
  return (
    <div
      className={cn("border p-5 rounded flex justify-between bg-black", {
        "border-gray": owner,
        "border-green": !owner,
      })}
    >
      <span className="text-xl">{name}.movr</span>
      {owner ? (
        <span>Current Owner: {shortenHex(owner)}</span>
      ) : (
        <p className="text-green">Available</p>
      )}
    </div>
  );
}
