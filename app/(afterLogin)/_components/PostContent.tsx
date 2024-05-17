'use client';

interface IPostContent {
  content: string;
}

const PostContent = ({ content }: IPostContent) => {
  return <div className="whitespace-pre-line">{content}</div>;
};

export default PostContent;
