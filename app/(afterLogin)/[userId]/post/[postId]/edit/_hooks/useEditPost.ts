import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { updatePost } from '@/app/(afterLogin)/home/_services/updatePost';
import useOnAuth from '@/app/_hooks/useOnAuth';
import { usePostStore } from '@/app/_store/usePost';
import { IPostId, IPostInputs } from '@/app/_types/post';

const useEditPost = ({ postId }: IPostId) => {
  const { user } = useOnAuth();
  const { reset, parentPostId } = usePostStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const updateFeed = useMutation({
    mutationFn: (data: IPostInputs) => updatePost({ user, data, postId }),
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

  return { updateFeed };
};

export default useEditPost;
