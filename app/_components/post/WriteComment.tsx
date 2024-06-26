'use client';

import { useRouter } from 'next/navigation';

import { usePostStore } from '@/app/_store/usePost';
import { IPostId } from '@/app/_types/post';

const WriteComment = ({ postId }: IPostId) => {
  const router = useRouter();
  const { setMode, setParentPostId } = usePostStore();
  const onWriteComment = () => {
    setMode('comment');
    setParentPostId(postId);
    router.push('/post');
  };

  return (
    <div className="cursor-pointer border-y-2 border-black p-3 hover:bg-gray-50" onClick={onWriteComment}>
      <p className="font-bold">답글 게시하기</p>
    </div>
  );
};

export default WriteComment;
