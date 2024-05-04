import { useQuery } from '@tanstack/react-query';

import { IPostData } from '@/app/types/post';
import { getPost } from '@/app/(afterLogin)/[userId]/post/[postId]/_lib/getPost';
import { SinglePostProps } from '@/app/(afterLogin)/[userId]/post/[postId]/_component/SinglePost';

const useGetSinglePost = ({ userId, postId }: SinglePostProps) => {
  const { data, error } = useQuery<
    IPostData | null,
    Object,
    IPostData,
    [_1: string, _2: string, _3: string]
  >({
    queryKey: [userId, 'post', postId],
    queryFn: getPost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!userId && !!postId,
  });

  return { data, error };
};

export default useGetSinglePost;
