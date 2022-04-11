import local from './local.json';
import testnet from './testnet.json';

const network = process.env.NETWORK;

const addresses =
  network === 'LOCAL' ? local : network === 'TESTNET' ? testnet : local;

export default addresses;
