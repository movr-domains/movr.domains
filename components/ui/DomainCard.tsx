import { DomainProps } from "constants/types";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

interface DomainCardProps {
  domain: DomainProps;
  expiration: string;
}

export default function DomainCard({ domain, expiration }: DomainCardProps) {
  return (
    <Link href={`/domain/${domain.labelName}/manage`} key={domain.id}>
      <a>
        <div className="bg-black transition duration-300 hover:border-opacity-100 relative">
          <div className="absolute top-3 flex justify-center text-white z-20 leading-0">
            <span>{domain.name}</span>
          </div>
          <div className="flex justify-center">
            <Image
              src="/NFTunavailable.png"
              height="300px"
              width="300px"
              alt={`${domain.labelName} domain`}
            />
          </div>
          <div className="flex flex-col items-end mt-2">
            <span className="text-xs uppercase text-gray -mb-2">
              Expires{" "}
              <span className="">
                {dayjs(parseInt(expiration) * 1000).format("MM/DD/YY")}
              </span>
            </span>
            <span className="font-bold uppercase text-yellow block">
              Manage Domain
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}
