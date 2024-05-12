import { useQuery } from '@tanstack/react-query';

import { IUserId } from '@/app/_types/user';
import { getMessageRooms } from '@/app/(afterLogin)/messages/_services/getMessageRooms';

const useMessageRooms = ({ userId }: IUserId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessageRooms({ userId }),
    enabled: !!userId,
  });

  return { data, isLoading, isError };
};

export default useMessageRooms;
