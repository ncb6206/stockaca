import { useQuery } from '@tanstack/react-query';

import { IUserData, IUserId } from '@/app/types/user';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';

const useGetUserData = ({ userId }: IUserId) => {
  const { data, error } = useQuery<
    IUserData | null,
    Object,
    IUserData,
    [_1: string, _2: string]
  >({
    queryKey: ['users', userId],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return { data, error };
};

export default useGetUserData;
