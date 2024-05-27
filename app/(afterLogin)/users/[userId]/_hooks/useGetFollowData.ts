import { useQuery } from '@tanstack/react-query';

import { getFollowData } from '@/app/(afterLogin)/users/[userId]/_services/getFollowData';
import { IUserId } from '@/app/_types/user';

const useGetFollowData = ({ userId }: IUserId) => {
  return useQuery({
    queryKey: ['follow', userId],
    queryFn: () => getFollowData({ userId }),
    enabled: !!userId,
  });
};

export default useGetFollowData;
