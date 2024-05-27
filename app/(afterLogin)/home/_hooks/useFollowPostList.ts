import { useQuery } from '@tanstack/react-query';

import { getFollowingPostList } from '@/app/(afterLogin)/home/_services/getFollowingPostList';
import { IUserId } from '@/app/_types/user';

const useFollowPostList = ({ userId }: IUserId) => {
  return useQuery({
    queryKey: ['post', userId, 'following'],
    queryFn: () => getFollowingPostList({ userId }),
    enabled: !!userId,
  });
};

export default useFollowPostList;
