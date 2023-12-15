import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from 'types/user-profile';

let posts: Post[] = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { key, id } = req.body;

  posts = posts.filter((post, index) => {
    if (post.id === key) {
      const cComments = post.data.comments || [];
      post.data.comments = [id, ...cComments];
      return post;
    }
    return post;
  });
  return res.status(200).json({ posts });
}
