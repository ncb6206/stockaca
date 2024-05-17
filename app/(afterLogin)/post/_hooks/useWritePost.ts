import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { writePost } from '@/app/(afterLogin)/home/_services/writePost';
import { usePostStore } from '@/app/_store/usePost';
import { IPostInputs } from '@/app/_types/post';
import useOnAuth from '@/app/_hooks/useOnAuth';

const useWritePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useOnAuth();
  const { parentPostId, reset } = usePostStore();

  const writeFeed = useMutation({
    mutationFn: (data: IPostInputs) => writePost({ user, data, parentPostId }),
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

export default useWritePost;
