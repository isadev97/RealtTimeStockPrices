import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../lib/mongodb';
import Price from '../../models/Price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo();

  const { symbol } = req.query;

  try {

    const prices = await Price.find({ symbol })
      .sort({ timestamp: -1 })
      .limit(20);

    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
}

