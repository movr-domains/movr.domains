import type { DomainInfo, TextRecords } from 'constants/types';
import React, { useState } from 'react';
import { InputGroup } from '@components/domain';
import { useRouter } from 'next/router';
import { moonbaseProvider } from '@lib/providers';
import { ethers } from 'ethers';

let subDomainRegistrars = {};

export default function ManageName() {
  const [domainInfo, setDomainInfo] = useState<DomainInfo>({
    reverseRegistrant: '',
    parent: '',
    registrant: '',
    controller: '',
    expirationDate: '',
    resolver: '',
  });
  const [textFields, setTextFields] = useState<TextRecords>({
    url: '',
    avatar: '',
    email: '',
    description: '',
    notice: '',
    keywords: '',
    discord: '',
    twitter: '',
    github: '',
    reddit: '',
    telegram: '',
  });

  const { query } = useRouter();
  const name = query.name;

  return (
    <main className='wrapper'>
      <div className='mb-5 col-span-12'>
        <span className='text-xs text-[#555]'>Manage Name</span>
        <h1 className='text-5xl text-yellow font-bold uppercase leading-5'>
          {name}.movr
        </h1>
      </div>
      <div className='col-span-12 lg:col-span-6'>
        <InputGroup
          // @ts-ignore
          fields={textFields}
          setFields={(args) => setTextFields(args)}
          title='Text Records'
        />
      </div>
      <div className='col-span-12 lg:col-span-6'>
        <InputGroup
          // @ts-ignore
          fields={domainInfo}
          setFields={(args) => setDomainInfo(args)}
          title='Domain Information'
        />
      </div>
      <div className='col-span-12 lg:col-span-6'>
        <h2>Subdomains</h2>
      </div>
    </main>
  );
}
