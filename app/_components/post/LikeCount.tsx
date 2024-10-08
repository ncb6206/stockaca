'use client';

import { IoHeartOutline, IoHeart } from 'react-icons/io5';

import useOnAuth from '@/app/_hooks/common/useOnAuth';
import { IPostListData } from '@/app/_types/post';
import useToggleLike from '@/app/_hooks/post/useToggleLike';

const LikeCount = ({ postId, post }: IPostListData) => {
  const { user } = useOnAuth();
  const { onToggleLike, liked } = useToggleLike({
    postId,
    userId: user?.displayName ?? '',
  });

  return (
    <div className="flex">
      <div className="flex items-center gap-1 text-gray-500" onClick={onToggleLike}>
        {liked ? <IoHeart className="text-xl text-red-500" /> : <IoHeartOutline className="text-xl" />}
        <p>{post?.likeCount}</p>
      </div>
    </div>
  );
};

export default LikeCount;
