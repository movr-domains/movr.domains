import { useQuery } from "@apollo/client";
import getName from "@lib/get-name";
import { GET_ALL_DOMAINS } from "graphql/queries";
import dayjs from "dayjs";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function AllDomainsAdminPage() {
  const { data, loading } = useQuery(GET_ALL_DOMAINS);
  return (
    <div>
      <h1>All Domains</h1>
      <div className="space-y-5">
        {!loading &&
          data &&
          data?.registrationEvents.map((event: any) => (
            <Registration regEvent={event} key={event.id} />
          ))}
      </div>
    </div>
  );
}

interface RegistrationProps {
  regEvent: any;
}

function Registration({ regEvent }: RegistrationProps) {
  const [movrName, setMovrName] = useState();
  useEffect(() => {
    async function fetchName() {
      const name = await getName(regEvent.registration.domain.owner.id);
      setMovrName(name);
    }
    fetchName();
  }, [regEvent]);

  return (
    <div key={regEvent.id} className="border">
      <p>{regEvent.registration.domain.name}</p>
      <p className="text-xs text-red-400">
        {`${movrName}.movr` || regEvent.registration.domain.owner.id}
      </p>
      <p>{ethers.utils.formatEther(regEvent.registration.cost)}</p>
      <p>
        {dayjs(parseInt(regEvent.registration.registrationDate) * 1000).format(
          "MM/DD/YYYY"
        )}
      </p>
    </div>
  );
}
