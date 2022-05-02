import type { DomainInfo, TextRecords } from 'constants/types';
import React, { useContext, useEffect, useState } from 'react';
import { InputGroup } from '@components/domain';
import {
  getResolver,
  registryContract,
  resolverContract,
  resolveText,
  setText,
} from '@lib/contract';
import { Web3Context } from '@components/wallet';
import { MdNotes, MdInfo, MdSegment } from 'react-icons/md';
import { GetServerSidePropsContext } from 'next';
import client from '@lib/apollo';
import {
  GET_DOMAIN_WITH_RESOLVER,
  GET_REGISTRATION,
  GET_RESOLVER_BY_ID,
} from 'graphql/queries';
import dayjs from 'dayjs';
import { namehash } from 'ethers/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ethers } from 'ethers';

interface DomainWithResolver {
  id: string;
  labelName: string;
  name: string;
  owner: {
    id: string;
    registrations: {
      cost: string;
      expiryDate: string;
      id: string;
      labelName: string;
      registrationDate: string;
    }[];
  };
  resolvedAddress: {
    id: string;
  };
  parent: {
    id: string;
    name: string;
  };
  resolver: {
    id: string;
    texts: string[];
    address: string;
  };
  ttl: boolean | null;
}

interface ManageNameProps {
  domain: DomainWithResolver;
}

const labelhash = (label: string) =>
  ethers.utils.keccak256(ethers.utils.toUtf8Bytes(label));

export default function ManageName({ domain }: ManageNameProps) {
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
  const [newSubdomain, setNewSubdomain] = useState('');
  const [addingSubdomain, setAddingSubdomain] = useState(false);
  const [subdomainProcessing, setSubdomainProcessing] = useState(false);

  useEffect(() => {
    if (domain) {
      setDomainInfo((d) => ({
        ...d,
        registrant: domain.owner.id,
        expirationDate: dayjs(
          parseFloat(domain.owner.registrations[0].expiryDate) * 1000
        ).format('MM/DD/YY @ hh:mm'),
        controller: domain.resolvedAddress.id,
        parent: `${domain.parent.id} - ${domain.parent.name}`,
        resolver: domain.resolver.address,
      }));
    }
  }, [domain]);

  useEffect(() => {
    const resolve = async (field: string) => {
      if (typeof domain.name !== 'string') return;
      const resolved = await resolveText(domain.name, field);
      return resolved;
    };

    async function getTexts() {
      const newFields: any = {};

      for (let record of domain.resolver.texts) {
        const resolvedText = await resolve(record);
        newFields[record] = resolvedText;
      }
      setTextFields((text) => ({ ...text, ...newFields }));
    }

    if (domain.resolver.texts) {
      getTexts();
    }
  }, [domain]);

  const setRecord = () => {
    if (typeof domain.name !== 'string') return;
    setText(state.web3Provider, domain.name, 'twitter', 'jfdgkfdgjk');
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
      domain.name,
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

  const createSubdomain = async () => {
    const signer = await state.web3Provider.getSigner();

    const registry = registryContract(signer);

    const node = namehash(domain.name);
    const label = labelhash(newSubdomain);
    const owner = state.address;
    console.log({ node, label, owner });

    setSubdomainProcessing(true);

    const set = await registry.setSubnodeOwner(node, label, owner);
    await set.wait();

    setSubdomainProcessing(false);
  };

  return (
    <React.Fragment>
      <main className='wrapper'>
        <div className='mb-5 col-span-12 mt-16'>
          <span className='uppercase mb-0.5 font-bold block text-[#555]'>
            Manage Name
          </span>

          <h1 className='text-5xl text-yellow font-bold uppercase leading-5'>
            {domain.name}
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

        <div className='col-span-12 bg-[#1d1d1d] rounded mb-12'>
          <div className='p-5'>
            <div className='flex text-white items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <MdSegment />
                <h2 className='text-3xl uppercase font-bold'>Subdomains</h2>
              </div>
              <div>
                <span
                  className='block uppercase font-bold text-sm tracking-wider cursor-pointer'
                  onClick={() => setAddingSubdomain(!addingSubdomain)}
                >
                  Add
                </span>
              </div>
            </div>
            <AnimatePresence>
              {addingSubdomain && (
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50, opacity: 0 }}
                  className='px-5 mt-5'
                >
                  <form
                    onSubmit={(e: React.FormEvent) => {
                      e.preventDefault();
                      createSubdomain();
                    }}
                  >
                    <label
                      htmlFor='new-subdomain'
                      className='uppercase text-lg font-bold font-cabin'
                    >
                      Add a New Subdomain
                    </label>
                    <input
                      id='new-subdomain'
                      value={newSubdomain}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewSubdomain(e.target.value)
                      }
                      placeholder='New Subdomain'
                      className='border bg-transparent w-full rounded px-3 py-1'
                    />
                    <div className='flex justify-end'>
                      <button className='btn uppercase font-bold'>
                        Create Subdomain
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
  if (!query.name) {
    return;
  }

  const { data } = await client.query({
    query: GET_DOMAIN_WITH_RESOLVER,
    variables: {
      id: `${namehash(Array.isArray(query.name) ? query.name[0] : query.name)}`,
    },
  });

  return {
    props: {
      domain: data.domain,
    },
  };
}
