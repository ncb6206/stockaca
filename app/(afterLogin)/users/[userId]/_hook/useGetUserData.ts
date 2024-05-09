import { useQuery } from '@tanstack/react-query';

import { IUserId } from '@/app/types/user';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';

const useGetUserData = ({ userId }: IUserId) => {
  const { data, error } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser({ userId }),
  });

  return { data, error };
};

export default useGetUserData;
