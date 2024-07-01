'use client';

import { memo } from 'react';
import { BsThreeDots } from 'react-icons/bs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IPostSetting } from '@/app/_types/post';
import usePostSetting from '@/app/_hooks/api/usePostSetting';
import useOnAuth from '@/app/_hooks/common/useOnAuth';

const PostCardSetting = ({ userId, postId, parentPostId, isCommentOwner }: IPostSetting) => {
  const { loading } = useOnAuth();
  const { onEditPost, onDeletePost } = usePostSetting({
    userId,
    postId,
    parentPostId,
  });

  if (loading) {
    return null;
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <BsThreeDots />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-3">
          {isCommentOwner && (
            <DropdownMenuItem className="hover:cursor-pointer" onClick={onEditPost}>
              수정
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="hover:cursor-pointer" onClick={onDeletePost}>
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default memo(PostCardSetting);
