import { useQuery } from '@tanstack/react-query';

import { IUserId } from '@/app/_types/user';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_services/getUser';

const useGetUserData = ({ userId }: IUserId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser({ userId }),
  });

  return { data, isLoading, error };
};

export default useGetUserData;
