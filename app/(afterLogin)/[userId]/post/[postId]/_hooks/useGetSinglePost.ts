import { useQuery } from '@tanstack/react-query';

import { IPostId } from '@/app/_types/post';
import { getPost } from '@/app/(afterLogin)/[userId]/post/[postId]/_services/getPost';

const useGetSinglePost = ({ postId }: IPostId) => {
  const { data, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost({ postId }),
    enabled: !!postId,
  });

  return { data, error };
};

export default useGetSinglePost;
