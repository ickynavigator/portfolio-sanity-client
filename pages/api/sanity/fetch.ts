import type { NextApiRequest, NextApiResponse } from 'next';
import { cors, runMiddleware } from '../../../src/lib/middleware';
import { getClient } from '../../../src/lib/sanity.server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'POST': {
      if (!req.body.query) {
        return res.status(400).json({
          message: 'No query provided',
        });
      }

      const { query } = req.body;

      const result = await getClient().fetch(query);

      return res.status(200).json(result);
    }
    default: {
      return res.status(405).json({
        message: 'Method not allowed',
      });
    }
  }
}
