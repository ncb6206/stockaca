import { MouseEventHandler, memo } from 'react';
import Link from 'next/link';

interface IPostUserNickName {
  hashedUserId: string;
  nickname?: string;
}

const PostCardUserNickName = ({
  hashedUserId,
  nickname,
}: IPostUserNickName) => {
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

export default memo(PostCardUserNickName);
