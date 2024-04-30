'use client';

import { MouseEvent } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BsThreeDots } from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IPostSetting } from '@/app/types/post';
import { deletePost } from '@/app/(afterLogin)/home/_lib/deletePost';
import { usePostStore } from '@/app/store/usePost';

const PostSetting = ({
  userId,
  postId,
  parentPostId,
  isCommentOwner,
}: IPostSetting) => {
  const queryClient = useQueryClient();
  const { setMode, setParentPostId } = usePostStore();
  const router = useRouter();

  const deleteFeed = useMutation({
    mutationFn: () => deletePost({ postId, parentPostId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      if (parentPostId) {
        queryClient.invalidateQueries({
          queryKey: ['post', parentPostId, 'comments'],
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

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-3">
          {isCommentOwner && (
            <DropdownMenuItem
              className="hover:cursor-pointer"
              onClick={onEditPost}
            >
              수정
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={onDeletePost}
          >
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PostSetting;
