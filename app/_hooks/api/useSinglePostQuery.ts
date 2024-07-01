import { useQuery } from '@tanstack/react-query';

import { IPostData, IPostId } from '@/app/_types/post';
import { getPost } from '@/app/_api/post/getPost';

const useSinglePostQuery = ({ postId }: IPostId) => {
  const { data, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPost({ postId }),
    enabled: !!postId,
  });

  const postData = { postId, post: data as IPostData };

  return { postData, error };
};

export default useSinglePostQuery;
