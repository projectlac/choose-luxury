import { UserProfile } from 'types/user-profile';
import { NextApiRequest, NextApiResponse } from 'next';
// user profile list
const users: UserProfile[] = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).send({ users });
}
