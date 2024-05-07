import { useQuery } from '@tanstack/react-query';

import { IUserId } from '@/app/types/user';
import { getMessageRooms } from '@/app/(afterLogin)/messages/_lib/getMessageRooms';

const useMessageRooms = ({ userId }: IUserId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessageRooms({ userId }),
    enabled: !!userId,
  });

  return { data, isLoading, isError };
};

export default useMessageRooms;
