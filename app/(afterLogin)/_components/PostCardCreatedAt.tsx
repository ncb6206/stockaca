'use client';

import React from 'react';

import { formatDateTime } from '@/app/_utils/formatDateTime';

interface IPostCreatedAt {
  createdAt: number;
}

const PostCardCreatedAt = ({ createdAt }: IPostCreatedAt) => {
  return (
    <p className="font-light text-gray-400">{formatDateTime({ createdAt })}</p>
  );
};

export default React.memo(PostCardCreatedAt);
