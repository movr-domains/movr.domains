import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import { GET_ACCOUNT_DOMAINS } from 'graphql/queries';
import { motion } from 'framer-motion';

interface DomainListProps {
  open: boolean;
  address: string;
  isHomePage?: boolean;
}

export default function DomainList({
  open,
  address,
  isHomePage,
}: DomainListProps) {
  const { data, loading, error } = useQuery(GET_ACCOUNT_DOMAINS, {
    variables: { account: address },
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={!isHomePage ? { y: -150 } : { opacity: 0 }}
          animate={!isHomePage ? { y: 0 } : { opacity: 1 }}
          exit={!isHomePage ? { y: -150 } : { opacity: 0 }}
          transition={{ duration: 0.3, bounce: 0 }}
          className='relative px-10 py-2 bg-[#111111] text-white text-base font-normal normal-case w-auto z-20'
        >
          {!loading && !error ? (
            <ul>
              {data?.account?.registrations?.map(
                (registration: any) =>
                  registration.domain.name && (
                    <li key={registration.domain.name}>
                      <Link href={`/domain/${registration.domain.name}`}>
                        <a>{registration.domain.name}</a>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          ) : loading ? (
            <p>Loading</p>
          ) : (
            <p>error</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
