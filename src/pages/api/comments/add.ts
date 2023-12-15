import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from 'types/user-profile';

let posts: Post[] = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, comment } = req.body;

  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  post.data.comments = [comment, ...cComments];
  return res.status(200).json({ posts: [...posts] });
}
