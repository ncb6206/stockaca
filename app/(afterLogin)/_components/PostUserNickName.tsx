'use client';

import { MouseEventHandler } from 'react';
import Link from 'next/link';

interface IPostUserNickName {
  hashedUserId: string;
  nickname?: string;
}

const PostUserNickName = ({ hashedUserId, nickname }: IPostUserNickName) => {
  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = e => {
    e.stopPropagation();
  };

  return (
    <Link
      href={`/users/${hashedUserId}`}
      className="hover:underline"
      onClick={stopPropagation}
    >
      <span className="font-bold">{nickname}</span>
    </Link>
  );
};

export default PostUserNickName;
