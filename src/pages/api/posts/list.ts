import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from 'types/user-profile';

let posts: Post[] = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ posts });
}
