import { useQuery } from '@tanstack/react-query';

import { getFollowingPostList } from '@/app/_api/post/getFollowingPostList';
import { IUserId } from '@/app/_types/user';

const useFollowPostListQuery = ({ userId }: IUserId) => {
  return useQuery({
    queryKey: ['post', userId, 'following'],
    queryFn: () => getFollowingPostList({ userId }),
    enabled: !!userId,
  });
};

export default useFollowPostListQuery;
