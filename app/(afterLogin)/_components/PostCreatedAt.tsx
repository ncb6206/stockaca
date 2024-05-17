'use client';

import { formatDateTime } from '@/app/_utils/formatDateTime';

interface IPostCreatedAt {
  createdAt: number;
}

const PostCreatedAt = ({ createdAt }: IPostCreatedAt) => {
  return (
    <p className="font-light text-gray-400">{formatDateTime({ createdAt })}</p>
  );
};

export default PostCreatedAt;
