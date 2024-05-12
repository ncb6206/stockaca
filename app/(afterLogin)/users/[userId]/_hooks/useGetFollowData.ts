import { useQuery } from '@tanstack/react-query';

import { getFollowData } from '@/app/(afterLogin)/users/[userId]/_services/getFollowData';
import { IUserId } from '@/app/_types/user';

const useGetFollowData = ({ userId }: IUserId) => {
  const { data } = useQuery({
    queryKey: ['follow', userId],
    queryFn: () => getFollowData({ userId }),
    enabled: !!userId,
  });

  return { data };
};

export default useGetFollowData;