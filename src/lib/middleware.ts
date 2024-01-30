import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Initializing the cors middleware
 *
 * You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
 */
export const cors = Cors();

/**
 * Helper method to wait for a middleware to execute before
 * continuing and to throw an error when an error happens
 * in a middleware
 */
export function runMiddleware<R = any>(
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line no-unused-vars
  fn: (request: NextApiRequest, response: NextApiResponse, ...args: any[]) => R,
) {
  return new Promise<R>((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
