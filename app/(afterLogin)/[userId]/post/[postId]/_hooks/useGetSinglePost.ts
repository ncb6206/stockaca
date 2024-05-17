import { useQuery } from '@tanstack/react-query';

import { IPostData, IPostId } from '@/app/_types/post';
import { getPost } from '@/app/(afterLogin)/[userId]/post/[postId]/_services/getPost';

const useGetSinglePost = ({ postId }: IPostId) => {
  const { data, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost({ postId }),
    enabled: !!postId,
  });

  const postData = { postId, post: data as IPostData };

  return { postData, error };
};

export default useGetSinglePost;
