import { useQuery } from '@tanstack/react-query';

import { getFollowingPostList } from '@/app/(afterLogin)/home/_services/getFollowingPostList';
import { IUserId } from '@/app/_types/user';

const useFollowPostList = ({ userId }: IUserId) => {
  const { data, isLoading } = useQuery({
    queryKey: ['post', userId, 'following'],
    queryFn: () => getFollowingPostList({ userId }),
    enabled: !!userId,
  });

  return { data, isLoading };
};

export default useFollowPostList;
