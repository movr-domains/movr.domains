import { NextApiRequest, NextApiResponse } from 'next';

export default async function metadata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({ msg: 'Route is working.' });
}
