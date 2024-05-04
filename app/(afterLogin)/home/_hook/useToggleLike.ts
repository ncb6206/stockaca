import { MouseEvent, useState, useEffect } from 'react';
import { likePost } from '../_lib/likePost';
import { unLikePost } from '../_lib/unLikePost';
import useLike from './useLike';

interface IUseToggleLike {
  postId: string;
  userId?: string;
  likeCount: number;
}

const useToggleLike = ({ postId, userId, likeCount }: IUseToggleLike) => {
  const { data: isLike } = useLike({ postId, userId });
  const [count, setCount] = useState(likeCount);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isLike) {
      setLiked(true);
    }
  }, [isLike]);

  const onToggleLike = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setLiked(prev => !prev);
    if (liked) {
      unLikePost({ userId, postId });
      setCount(prev => prev - 1);
    } else {
      likePost({ userId, postId });
      setCount(prev => prev + 1);
    }
  };

  return { onToggleLike, liked, count };
};

export default useToggleLike;
