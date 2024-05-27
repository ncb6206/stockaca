import { MouseEvent, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ILikeData } from '@/app/_types/like';
import { likePost } from '@/app/(afterLogin)/home/_services/likePost';
import { unLikePost } from '@/app/(afterLogin)/home/_services/unLikePost';
import useGetLiked from '@/app/(afterLogin)/home/_hooks/useGetLiked';

const useToggleLike = ({ postId, userId }: ILikeData) => {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const { data: isLiked } = useGetLiked({ userId, postId });

  const mutationLike = useMutation({
    mutationFn: () => likePost({ userId, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['like', userId] });
    },
    onError: error => {
      console.error('Error like post:', error);
    },
  });

  const mutationUnLike = useMutation({
    mutationFn: () => unLikePost({ userId, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['like', userId] });
    },
    onError: error => {
      console.error('Error unlike post:', error);
    },
  });

  useEffect(() => {
    setLiked(!!isLiked);
  }, [isLiked]);

  const onToggleLike = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setLiked(prev => !prev);

    if (liked) {
      mutationUnLike.mutate();
    } else {
      mutationLike.mutate();
    }
  };

  return { onToggleLike, liked };
};

export default useToggleLike;
