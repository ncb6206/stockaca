'use client';

import { IoHeartOutline, IoHeart } from 'react-icons/io5';

import useOnAuth from '@/app/_lib/useOnAuth';
import { IPostListData } from '@/app/types/post';
import useToggleLike from '@/app/(afterLogin)/home/_hook/useToggleLike';

const LikeCount = ({ postId, post }: IPostListData) => {
  const { user } = useOnAuth();
  const { onToggleLike, liked, count } = useToggleLike({
    postId,
    userId: user?.uid,
    likeCount: post.likeCount,
  });

  return (
    <div className="flex">
      <div
        className="flex items-center gap-1 text-gray-500"
        onClick={onToggleLike}
      >
        {liked ? (
          <IoHeart className="text-xl text-red-500" />
        ) : (
          <IoHeartOutline className="text-xl" />
        )}
        <p>{count}</p>
      </div>
    </div>
  );
};

export default LikeCount;
