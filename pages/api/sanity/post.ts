import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getClient } from '../../../lib/sanity.server';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors();

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

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
