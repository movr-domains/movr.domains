import { gql } from '@apollo/client';
import client from '@lib/apollo';
import { NextApiRequest, NextApiResponse } from 'next';

const GET_DOMAINS = gql`
  query getDomains($tokenId: String) {
    domain(id: $tokenId) {
      id
      labelhash
      name
      parent {
        id
      }
      resolver {
        texts
      }
    }
  }
`;

export default async function metadata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId;
  if (!tokenId)
    return res.status(400).json({ error: 'No tokenId was passed.' });

  const { data: request } = await client.query({
    query: GET_DOMAINS,
    variables: { tokenId },
  });

  console.log(request.domain);

  // Pass name and generate the image

  // Set metadata

  return res.status(200).json({ msg: 'Route is working.', tokenId });
}
