import { memo } from 'react';

interface IPostContent {
  content: string;
}

const PostCardContent = ({ content }: IPostContent) => {
  return <div className="whitespace-pre-line">{content}</div>;
};

export default memo(PostCardContent);
