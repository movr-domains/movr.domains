import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import classnames from "classnames";
import YearSelect from "@components/domain/year-select";
import { motion } from "framer-motion";

export default function DomainNamePage({ name }: { name: string }) {
  const available = true;

  const domainInfo = {
    letterAmount: name.length,
    domain: "movr",
    letterYearPrice: name.length === 3 ? 250 : name.length === 4 ? 100 : 10,
    letterLifetimePrice:
      name.length === 3 ? 5000 : name.length === 4 ? 2500 : null,
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-5"
    >
      <h1 className="text-2xl mb-3">
        Register a Domain:{" "}
        <span className="font-bold uppercase">
          {name}
          {".movr"}
        </span>
      </h1>
      <p className="text-gray">
        Type to search for available domains.{" "}
        <Link href="#">
          <a className="text-green underline">Costs</a>
        </Link>
      </p>
      <p>
        <span className="text-yellow">Domain </span>
        <span
          className={classnames({
            "text-[#00ff00]": true,
            "#text-[#ff0000]": false,
          })}
        >
          available
        </span>
        {domainInfo.letterAmount < 5 ? (
          <span>{` - ${domainInfo.letterAmount} .${domainInfo.domain} domains are available for $${domainInfo.letterYearPrice} per year or $${domainInfo.letterLifetimePrice} for lifetime registration.`}</span>
        ) : (
          <span>
            {` - ${domainInfo.letterAmount} .${domainInfo.domain} domains are available for $${domainInfo.letterYearPrice} per year.`}
          </span>
        )}
      </p>
      <div>
        <YearSelect />
      </div>
      <p className="text-gray py-10">
        Transaction info goes here: blah blah blah
      </p>
    </motion.main>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  return { props: { name: context.params?.name } };
}
