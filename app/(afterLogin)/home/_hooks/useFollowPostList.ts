import { useQuery } from '@tanstack/react-query';

import { getFollowingPostList } from '@/app/(afterLogin)/home/_services/getFollowingPostList';
import { IUserId } from '@/app/_types/user';

const useFollowPostList = ({ userId }: IUserId) => {
  const { data, isLoading } = useQuery({
    queryKey: ['post', userId, 'following'],
    queryFn: () => getFollowingPostList({ userId }),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!userId,
  });

  return { isLoading, data };
};

export default useFollowPostList;
