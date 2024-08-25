import { useQueryClient, useMutation } from '@tanstack/react-query';

import { postLikePost } from '@/app/_api/post/postLikePost';

const useLikeMutation = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: postLikePost,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['like', userId] });
    },
    onError: error => {
      console.error('Error like post:', error);
    },
  });

  return { likeMutation };
};

export default useLikeMutation;
