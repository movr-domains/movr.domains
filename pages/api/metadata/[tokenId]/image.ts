import client from '@lib/apollo';
import createSVGfromTemplate from '@lib/metadata/svg-template';
import { GET_DOMAINS_BY_LABELHASH } from 'graphql/queries';
import { NextApiRequest, NextApiResponse } from 'next';
import btoa from 'btoa';
import { ethers } from 'ethers';
import { createCanvas } from 'canvas';

export default async function metaDataImage(
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

  const { data } = await client.query({
    query: GET_DOMAINS_BY_LABELHASH,
    variables: { tokenId },
  });
  console.log(data);

  // TODO: Don't forget to get the name from the request object
  if (!data?.domains[0]) {
    return res.status(404).json({ error: 'No token found with that ID' });
  }

  const name = data.domains[0].name;

  function generateImage() {
    // detect font size
    const getFontSize = () => {
      const canvas = createCanvas(270, 270);
      const ctx = canvas.getContext('2d');
      ctx.font = '20px Cabin';
      const fontMetrics = ctx.measureText(name);
      // some nasty hack on calculation
      // 270 - (32.5 px padding both sides * 2)
      const fontSize = Math.floor(20 * (200 / fontMetrics.width));
      return fontSize < 34 ? fontSize : 32;
    };

    const fontSize = getFontSize();

    const svg = createSVGfromTemplate(name, fontSize);
    const encode = btoa(
      encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
    return 'data:image/svg+xml;base64,' + encode;
  }
  const imageUrl = generateImage();
  const base64 = imageUrl.replace('data:image/svg+xml;base64,', '');
  const buffer = Buffer.from(base64, 'base64');

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Content-Length', buffer.length);
  return res.status(200).end(buffer);
}
