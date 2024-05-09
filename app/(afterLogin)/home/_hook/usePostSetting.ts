import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { usePostStore } from '@/app/store/usePost';
import { deletePost } from '@/app/(afterLogin)/home/_lib/deletePost';

interface IUsePostSetting {
  userId: string;
  postId: string;
  parentPostId?: string;
}

const usePostSetting = ({ userId, postId, parentPostId }: IUsePostSetting) => {
  const queryClient = useQueryClient();
  const { setMode, setParentPostId } = usePostStore();
  const router = useRouter();

  const deleteFeed = useMutation({
    mutationFn: () => deletePost({ postId, parentPostId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      if (parentPostId) {
        queryClient.invalidateQueries({
          queryKey: ['post', parentPostId],
        });
      }
      toast.success('삭제되었습니다!');
    },
    onError: error => {
      console.error('Error deleting post:', error);
      toast.error('게시글 삭제 실패');
    },
  });

  const onEditPost = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (parentPostId) {
      setMode('comment');
      setParentPostId(parentPostId);
    }
    router.push(`/${userId}/post/${postId}/edit`);
  };

  const onDeletePost = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    deleteFeed.mutate();
  };

  return { onEditPost, onDeletePost };
};

export default usePostSetting;
