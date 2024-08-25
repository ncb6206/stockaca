import { MouseEvent, useState, useEffect } from 'react';

import { ILikeData } from '@/app/_types/like';
import useLikedQuery from '@/app/_hooks/api/useLikedQuery';
import useLikeMutation from '@/app/_hooks/api/useLikeMutation';
import useUnLikeMutation from '@/app/_hooks/api/useUnLikeMutation';

const useToggleLike = ({ postId, userId }: ILikeData) => {
  const [liked, setLiked] = useState<boolean>(false);
  const { data: isLiked } = useLikedQuery({ userId, postId });

  const { likeMutation } = useLikeMutation();
  const { unLikeMutation } = useUnLikeMutation();

  useEffect(() => {
    setLiked(!!isLiked);
  }, [isLiked]);

  const onToggleLike = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setLiked(prev => !prev);

    if (liked) {
      unLikeMutation.mutate({ userId, postId });
    } else {
      likeMutation.mutate({ userId, postId });
    }
  };

  return { onToggleLike, liked };
};

export default useToggleLike;
