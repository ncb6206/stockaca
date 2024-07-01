import { useQuery } from '@tanstack/react-query';

import { getFollowData } from '@/app/_api/users/getFollowData';
import { IUserId } from '@/app/_types/user';

const useFollowQuery = ({ userId }: IUserId) => {
  return useQuery({
    queryKey: ['follow', userId],
    queryFn: () => getFollowData({ userId }),
    enabled: !!userId,
  });
};

export default useFollowQuery;
