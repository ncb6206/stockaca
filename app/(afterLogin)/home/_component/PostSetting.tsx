'use client';

import { MouseEvent } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { BsThreeDots } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IPostSetting } from '@/app/types/post';
import { deletePost } from '../_lib/deletePost';
import { hashUid } from '@/app/_lib/hashUid';

const PostSetting = ({ userId, postId }: IPostSetting) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteFeed = useMutation({
    mutationFn: () => deletePost({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('삭제되었습니다!');
    },
    onError: error => {
      console.error('Error deleting post:', error);
      toast.error('게시글 삭제 실패');
    },
  });

  const onEditPost = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const hashUserId = hashUid({ uid: userId });
    router.push(`/${hashUserId}/post/${postId}/edit`);
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
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={onEditPost}
          >
            수정
          </DropdownMenuItem>
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
