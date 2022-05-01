import { DomainProps } from 'constants/types';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';

interface DomainCardProps {
  domain: DomainProps;
  expiration: string;
}

export default function DomainCard({ domain, expiration }: DomainCardProps) {
  return (
    <Link href={`/domain/${domain.labelName}/manage`} key={domain.id}>
      <a>
        <div className='bg-black transition duration-300 hover:border-opacity-100 p-3 rounded drop-shadow relative'>
          <div className='flex justify-center'>
            {domain.id && (
              <Image
                src={`http://whispering-journey-12465.herokuapp.com/${domain.labelhash}/image`}
                height='300px'
                width='300px'
                alt={`${domain.labelName} domain`}
              />
            )}
          </div>
          <div className='flex flex-col items-end mt-2'>
            <span className='text-xs uppercase text-gray -mb-2'>
              Expires{' '}
              <span className=''>
                {dayjs(parseInt(expiration) * 1000).format('MM/DD/YY')}
              </span>
            </span>
            <span className='font-bold uppercase text-yellow block'>
              Manage Domain
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}
