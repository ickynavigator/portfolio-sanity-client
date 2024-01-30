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
      try {
        const data = req.body;

        const dryrun = req.query.dryrun as unknown as boolean;

        const result = await getClient().create(data, { dryRun: dryrun });

        return res.status(200).json(result);
      } catch (error) {
        console.error(error);
        return res.status(500).json(error);
      }
    }
    default: {
      return res.status(405).json({
        message: 'Method not allowed',
      });
    }
  }
}
