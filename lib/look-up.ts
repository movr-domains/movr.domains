import addresses from 'constants/contracts';
import { ethers } from 'ethers';
// @ts-ignore
import namehash from 'eth-ens-namehash';
import ENSRegistry from '@lib/abis/MOVRRegistrarControllerABI.json';
import { moonbaseProvider } from './providers';
import client from './apollo';
import { gql } from '@apollo/client';

const LOOKUP_DOMAIN = gql`
  query lookupOwner($name: String!) {
    domains(where: { name: $name }) {
      id
      name
      owner {
        id
      }
    }
  }
`;

const lookUpOwner = async (name: string) => {
  console.log('HELLO');
  if (!name) return;
  // const provider = moonbaseProvider;

  // const registry = new ethers.Contract(
  //   addresses.registry,
  //   ENSRegistry.abi,
  //   provider
  // );
  // console.log(namehash.hash(`${name}.movr`));

  // const owner = await registry.owner(namehash.hash(`${name}.movr`));
  // return owner !== '0x0000000000000000000000000000000000000000' ? owner : null;
  console.log(name);

  const query = await client.query({
    query: LOOKUP_DOMAIN,
    variables: { name: `${name}.movr` },
  });
  const owner = query.data.domains.length !== 0;

  if (owner) {
    return query.data.domains[0].owner.id;
  }
  return null;
};

export default lookUpOwner;
