import { MouseEvent, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ILikeData } from '@/app/_types/like';
import { postLikePost } from '@/app/_api/post/postLikePost';
import { deleteLikePost } from '@/app/_api/post/deleteLikePost';
import useLikedQuery from '@/app/_hooks/api/useLikedQuery';

const useToggleLike = ({ postId, userId }: ILikeData) => {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const { data: isLiked } = useLikedQuery({ userId, postId });

  const mutationLike = useMutation({
    mutationFn: () => postLikePost({ userId, postId }),
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
    mutationFn: () => deleteLikePost({ userId, postId }),
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
