import type { DomainInfo, TextRecords } from 'constants/types';
import React, { useContext, useState } from 'react';
import { InputGroup } from '@components/domain';
import { useRouter } from 'next/router';
import { moonbaseProvider } from '@lib/providers';
import { ethers } from 'ethers';
import {
  checkOwner,
  createSubdomain,
  resolveText,
  setText,
} from '@lib/contract';
import { Web3Context } from '@components/wallet';
import { gql, useQuery } from '@apollo/client';
import { MdNotes, MdInfo } from 'react-icons/md';

let subDomainRegistrars = {};

export default function ManageName() {
  const { state } = useContext(Web3Context);
  const { data } = useQuery(gql``);

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

  const setRecord = () => {
    if (typeof name !== 'string') return;
    setText(state.web3Provider, `${name}.movr`, 'twitter', 'natelook');
  };

  const resolve = async () => {
    if (typeof name !== 'string') return;
    const resolved = await resolveText(`${name}.movr`, 'twitter');
    console.log('twitter: ', resolved);
  };

  return (
    <React.Fragment>
      <main className='wrapper'>
        <div className='mb-5 col-span-12 mt-16'>
          <span className='uppercase mb-0.5 font-bold block text-[#555]'>
            Manage Name
          </span>

          <h1 className='text-5xl text-yellow font-bold uppercase leading-5'>
            {name}.movr
          </h1>
        </div>
        <div className='col-span-12  bg-[#1d1d1d] rounded mb-10'>
          <InputGroup
            // @ts-ignore
            fields={textFields}
            setFields={(args) => setTextFields(args)}
            title='Text Records'
            icon={<MdNotes />}
          />
        </div>
        <div className='col-span-12  bg-[#3C3C3C] rounded'>
          <InputGroup
            // @ts-ignore
            fields={domainInfo}
            setFields={(args) => setDomainInfo(args)}
            title='Domain Information'
            icon={<MdInfo />}
          />
        </div>
        <div className='col-span-12 lg:col-span-6'>
          <h2>Subdomains</h2>
          <button onClick={() => checkOwner()}>Testing</button>
        </div>
      </main>
      <div className='fixed bottom-2 right-2 flex space-x-3'>
        <button
          onClick={setRecord}
          className='bg-pink-500 px-3 py-1 rounded font-cabin uppercase block'
        >
          Set Record
        </button>
        <button
          onClick={resolve}
          className='bg-pink-500 px-3 py-1 rounded font-cabin uppercase block'
        >
          Resolve
        </button>
      </div>
    </React.Fragment>
  );
}
