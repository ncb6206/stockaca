'use client';

import { FaRegComment } from 'react-icons/fa';

interface CommentCountProps {
  commentCount: number;
}

const CommentCount = ({ commentCount }: CommentCountProps) => {
  return (
    <div className="flex">
      <div className="flex items-center gap-1 text-gray-500">
        <FaRegComment />
        <p>{commentCount}</p>
      </div>
    </div>
  );
};

export default CommentCount;
