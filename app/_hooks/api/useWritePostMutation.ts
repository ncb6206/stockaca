import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { postPost } from '@/app/_api/post/postPost';
import { usePostStore } from '@/app/_store/usePost';

const useWritePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { parentPostId, reset } = usePostStore();

  const writeFeed = useMutation({
    mutationFn: postPost,
    onSuccess: () => {
      if (parentPostId) {
        queryClient.invalidateQueries({
          queryKey: ['post', parentPostId, 'comments'],
        });
        queryClient.invalidateQueries({
          queryKey: ['post', parentPostId],
        });
        router.back();
      } else {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        router.replace('/home');
      }
      toast.success('게시물이 작성되었습니다!');
      reset();
    },
    onError: error => {
      console.error('Error writing post:', error);
      toast.error('게시물 작성 실패');
    },
  });

  return { writeFeed };
};

export default useWritePostMutation;
