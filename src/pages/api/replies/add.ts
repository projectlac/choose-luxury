import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from 'types/user-profile';

let posts: Post[] = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, commentId, reply } = req.body;
  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  const commentIndex = cComments.findIndex((x) => x.id === commentId);
  const comment = cComments[commentIndex];
  /** comment.data.replies has to be defined */
  if (comment && comment.data && comment.data.replies) comment.data.replies = [...comment.data.replies, reply];
  return res.status(200).json({ posts });
}
