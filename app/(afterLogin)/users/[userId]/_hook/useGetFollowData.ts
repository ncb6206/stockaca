import { useQuery } from '@tanstack/react-query';

import { IFollowData } from '@/app/types/follow';
import { getFollowData } from '@/app/(afterLogin)/users/[userId]/_lib/getFollowData';
import { IUserId } from '@/app/types/user';

const useGetFollowData = ({ userId }: IUserId) => {
  const { data } = useQuery<
    IFollowData | null,
    Object,
    IFollowData,
    [_1: string, _2: string]
  >({
    queryKey: ['follow', userId],
    queryFn: getFollowData,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!userId,
  });

  return { data };
};

export default useGetFollowData;
