'use client';

import { MouseEvent, useEffect, useState } from 'react';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

import useOnAuth from '@/app/_lib/useOnAuth';
import { IPostListData } from '@/app/types/post';
import useLike from '@/app/(afterLogin)/home/_lib/useLike';
import { likePost } from '../_lib/likePost';
import { unLikePost } from '../_lib/unLikePost';

const LikeCount = ({ postId, post }: IPostListData) => {
  const { user } = useOnAuth();
  const { data: isLike } = useLike({ postId, userId: user?.uid });
  const [count, setCount] = useState(post.likeCount);
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (isLike) {
      setLike(true);
    }
  }, [isLike]);

  const onToggleLike = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setLike(prev => !prev);
  };

  const onLike = () => {
    likePost({ userId: user?.uid, postId });
    setCount(prev => prev + 1);
  };

  const onUnLike = () => {
    unLikePost({ userId: user?.uid, postId });
    setCount(prev => prev - 1);
  };

  return (
    <div className="flex">
      <div
        className="flex items-center gap-1 text-gray-500"
        onClick={onToggleLike}
      >
        {like ? (
          <IoHeart className="text-xl text-red-500" onClick={onUnLike} />
        ) : (
          <IoHeartOutline className="text-xl" onClick={onLike} />
        )}
        <p>{count}</p>
      </div>
    </div>
  );
};

export default LikeCount;
