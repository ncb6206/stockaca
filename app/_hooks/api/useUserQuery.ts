import { useQuery } from '@tanstack/react-query';

import { IUserId } from '@/app/_types/user';
import { getUser } from '@/app/_api/users/getUser';

const useUserQuery = ({ userId }: IUserId) => {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUser({ userId }),
  });
};

export default useUserQuery;
