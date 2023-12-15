import { NextApiRequest, NextApiResponse } from 'next';
import { Post } from 'types/user-profile';

let posts: Post[] = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId, commentId } = req.body;
  const postIndex = posts.findIndex((x) => x.id === postId);
  const post = posts[postIndex];
  const cComments = post.data.comments || [];
  const commentIndex = cComments.findIndex((x) => x.id === commentId);
  const comment = { ...cComments[commentIndex] };
  /** comment.data.likes has to be defined  */
  if (comment && comment.data && comment.data.likes) comment.data.likes.like = !comment.data.likes.like;
  if (comment && comment.data && comment.data.likes)
    comment.data.likes.value = comment.data.likes.like ? comment.data.likes.value + 1 : comment.data.likes.value - 1;
  if (post && post.data && post.data.comments) post.data.comments[commentIndex] = comment;
  return res.status(200).json({ posts });
}
