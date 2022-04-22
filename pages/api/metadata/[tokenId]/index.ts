import client from '@lib/apollo';
import { NextApiRequest, NextApiResponse } from 'next';
import { GET_DOMAIN, GET_DOMAINS_BY_LABELHASH } from 'graphql/queries';
import { ethers } from 'ethers';

export default async function metadata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let tokenId = req.query.tokenId;

  if (!tokenId)
    return res.status(400).json({ error: 'No tokenId was passed.' });

  if (typeof tokenId !== 'string') {
    tokenId = tokenId[0];
  }

  if (!tokenId.match(/^0x/)) {
    tokenId = ethers.utils.hexZeroPad(
      ethers.utils.hexlify(ethers.BigNumber.from(tokenId)),
      32
    );
  }

  const { data: domainData } = await client.query({
    query: GET_DOMAINS_BY_LABELHASH,
    variables: { tokenId },
  });

  const domainId = domainData.domains[0].id;

  const { data: registrationData } = await client.query({
    query: GET_DOMAIN,
    variables: { tokenId: domainId },
  });

  console.log(registrationData);

  if (!registrationData.registrations[0]) {
    return res
      .status(404)
      .json({ error: `No token found with the tokenId of ${tokenId}` });
  }

  const domain = registrationData.registrations[0].domain;
  // console.log(domain);

  // Set metadata
  const metadata = {
    name: domain.name,
    image: `${process.env.BASE_URL}/api/metadata/${tokenId}/image`,
    description: `${domain.name} a MDR name.`,
    external_url: `${process.env.BASE_URL}/domain/${domain.name}`,
    name_length: domain.labelName.length,
    attributes: [
      {
        trait_type: 'Expiration Date',
        value: registrationData.registrations[0].expiryDate * 1000,
      },
      {
        trait_type: 'Registration Date',
        value: registrationData.registrations[0].registrationDate * 1000,
      },
      {
        trait_type: 'Length',
        value: domain.labelName.length,
      },
    ],
  };

  return res.status(200).json(metadata);
}
