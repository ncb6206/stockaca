import { MouseEvent, useState, useEffect } from 'react';
import { likePost } from '@/app/(afterLogin)/home/_services/likePost';
import { unLikePost } from '@/app/(afterLogin)/home/_services/unLikePost';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getLike } from '../_services/getLike';

interface IUseToggleLike {
  postId: string;
  userId?: string;
}

const useToggleLike = ({ postId, userId }: IUseToggleLike) => {
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);

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
    const checkLiked = async () => {
      if (userId && postId) {
        const likeData = await getLike({ userId, postId });
        setLiked(!!likeData);
      }
    };

    checkLiked();
  }, [postId, userId]);

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
