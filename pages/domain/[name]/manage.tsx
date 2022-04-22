import type { DomainInfo, TextRecords } from 'constants/types';
import React, { useContext, useEffect, useState } from 'react';
import { InputGroup } from '@components/domain';
import { useRouter } from 'next/router';
import {
  checkOwner,
  resolverContract,
  resolveText,
  setText,
} from '@lib/contract';
import { Web3Context } from '@components/wallet';
import { gql, useQuery } from '@apollo/client';
import { MdNotes, MdInfo } from 'react-icons/md';
import { ethers } from 'ethers';
import { GetServerSidePropsContext } from 'next';
import client from '@lib/apollo';
import { GET_REGISTRATION, GET_RESOLVER_BY_ID } from 'graphql/queries';
import dayjs from 'dayjs';

let subDomainRegistrars = {};

interface ManageNameProps {
  name: string;
  registrationInfo: {
    labelName: string;
    id: string;
    registrant: {
      id: string;
    };
    expiryDate: string;
    domain: {
      parent: {
        id: string;
        owner: {
          id: string;
        };
      };
      owner: {
        id: string;
      };
    };
  };
  textRecords: string[];
}

export default function ManageName({
  name,
  registrationInfo,
  textRecords,
}: ManageNameProps) {
  const { state } = useContext(Web3Context);

  const [domainInfo, setDomainInfo] = useState<DomainInfo>({
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

  const [currentFields, setCurrentFields] = useState<TextRecords | null>(null);

  useEffect(() => {
    if (registrationInfo) {
      setDomainInfo((d) => ({
        ...d,
        registrant: registrationInfo.registrant.id,
        expirationDate: dayjs(
          parseFloat(registrationInfo.expiryDate) * 1000
        ).format('MM/DD/YY @ hh:mm'),
        controller: registrationInfo.registrant.id,
        parent: registrationInfo.domain.parent.id,
        resolver: registrationInfo.domain.parent.owner.id,
      }));
    }
  }, [registrationInfo]);

  useEffect(() => {
    const resolve = async (field: string) => {
      if (typeof name !== 'string') return;
      const resolved = await resolveText(`${name}.movr`, field);
      return resolved;
    };

    async function getTexts() {
      const newFields: any = {};

      for (let record of textRecords) {
        const resolvedText = await resolve(record);
        newFields[record] = resolvedText;
      }
      setTextFields((text) => ({ ...text, ...newFields }));
    }

    if (textRecords) {
      getTexts();
    }
    // @ts-ignore
  }, [name, textRecords]);

  const setRecord = () => {
    if (typeof name !== 'string') return;
    setText(state.web3Provider, `${name}.movr`, 'twitter', 'caity');
  };

  const updateRecords = async () => {
    if (!currentFields) return;

    const resolver = resolverContract(state.web3Provider);

    const fieldsToUpdate: any = {};
    const multiCallArray: any = [];
    console.log(resolver);
    // const method = await resolver.setText(
    //   `${name}.movr`,
    //   'url',
    //   'https://natelook.com'
    // );
    // await method.wait();
    const test = resolver.populateTransaction.setText(
      `${name}.movr`,
      'url',
      'https://natelook.com'
    );

    console.log(test);

    // Object.entries(textFields).map(([key, value]) => {
    //   // @ts-ignore
    //   if (value !== currentFields[key]) {
    //     fieldsToUpdate[key] = value;
    //     const method = resolver.setText(`${name}.movr`, key, value);

    //     // const method = resolver.interface.encodeFunctionData('setText', [
    //     //   `${name}.movr`,
    //     //   key,
    //     //   value,
    //     // ]);

    //     // const ABI = [
    //     //   'function setText(bytes32 node, string calldata key, string calldata value) external',
    //     // ];
    //     // const method = new ethers.utils.Interface(ABI);

    //     multiCallArray.push(method);
    //   }
    // });

    console.log(multiCallArray);
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
        <div className='col-span-12  bg-[#1d1d1d] rounded'>
          <InputGroup
            // @ts-ignore
            fields={domainInfo}
            setFields={(args) => setDomainInfo(args)}
            title='Domain Information'
            icon={<MdInfo />}
            setCurrentFields={(fields) => setCurrentFields(fields)}
            updateRecords={updateRecords}
          />
        </div>
        <div className='col-span-12 mt-10  bg-[#1d1d1d] rounded mb-10'>
          <InputGroup
            // @ts-ignore
            fields={textFields}
            setFields={(args) => setTextFields(args)}
            title='Text Records'
            icon={<MdNotes />}
            setCurrentFields={(fields) => setCurrentFields(fields)}
            updateRecords={updateRecords}
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
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const { data } = await client.query({
    query: GET_REGISTRATION,
    variables: { labelName: `${query.name}` },
  });

  const { data: texts } = await client.query({
    query: GET_RESOLVER_BY_ID,
    variables: { id: data.registrations[0].domain.id },
  });

  let textRecords = null;

  if (texts.resolvers.length !== 0) {
    textRecords = texts.resolvers[0].texts;
  }

  return {
    props: {
      name: query.name,
      registrationInfo: data.registrations[0],
      textRecords,
    },
  };
}
