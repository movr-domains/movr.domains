import Loading from '@components/ui/Loading';
import { Web3Context } from '@components/wallet';
import {
  checkOwner,
  controllerContract,
  getName,
  getResolver,
  registryContract,
  resolverContract,
} from '@lib/contract';
import contractLog from '@lib/dev/console-contract';
import { ethers } from 'ethers';
import { namehash } from 'ethers/lib/utils';
import { useContext, useEffect } from 'react';
import { RiCoinsLine } from 'react-icons/ri';

export default function TestPage() {
  const { state } = useContext(Web3Context);

  useEffect(() => {
    async function fetch() {
      const name = 'fart.caity.movr';
    }
    fetch();
  }, []);

  const transfer = async () => {
    console.log('transferring');
    const signer = state.web3Provider.getSigner();

    const registrar = controllerContract(signer);
    contractLog(registrar);

    const transfer = await registrar.transferOwnership(
      '0x3Cd0A705a2DC65e5b1E1205896BaA2be8A07c6e0'
    );
    console.log(transfer);
  };

  const label = async (label: string) => {
    const resolver = resolverContract();
    // contractLog(resolver);

    // const name = resolver.name(namehash('movr'));
    // console.log(await name);
    const reverse = console.log('owner', await checkOwner('movr'));

    const registry = registryContract();
    // contractLog(registry);
  };

  return (
    <div>
      <p>Hi</p>
      <div className='flex space-x-10'>
        <button onClick={transfer}>Transfer</button>
        <button onClick={() => label('movr')}>Label</button>
      </div>
    </div>
  );
}
