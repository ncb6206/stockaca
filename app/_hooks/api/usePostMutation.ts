import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { updatePost } from '@/app/_api/post/updatePost';
import { usePostStore } from '@/app/_store/usePost';
import { IPostId } from '@/app/_types/post';

const usePostMutation = ({ postId }: IPostId) => {
  const { reset, parentPostId } = usePostStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      if (parentPostId) {
        queryClient.invalidateQueries({
          queryKey: ['post', parentPostId, 'comments'],
        });
      }
      router.back();
      toast.success('게시물이 수정되었습니다!');
      reset();
    },
    onError: error => {
      console.error('Error editing post:', error);
      toast.error('게시물 수정 실패');
    },
  });

  return { postMutation };
};

export default usePostMutation;
