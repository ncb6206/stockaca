'use client';

import { BsThreeDots } from 'react-icons/bs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IPostSetting } from '@/app/types/post';
import usePostSetting from '../_hook/usePostSetting';

const PostSetting = ({
  userId,
  postId,
  parentPostId,
  isCommentOwner,
}: IPostSetting) => {
  const { onEditPost, onDeletePost } = usePostSetting({
    userId,
    postId,
    parentPostId,
  });

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
