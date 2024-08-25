import { useQueryClient, useMutation } from '@tanstack/react-query';

import { deleteLikePost } from '@/app/_api/post/deleteLikePost';

const useUnLikeMutation = () => {
  const queryClient = useQueryClient();

  const unLikeMutation = useMutation({
    mutationFn: deleteLikePost,
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post'] });
      queryClient.invalidateQueries({ queryKey: ['like', userId] });
    },
    onError: error => {
      console.error('Error unlike post:', error);
    },
  });

  return { unLikeMutation };
};

export default useUnLikeMutation;
