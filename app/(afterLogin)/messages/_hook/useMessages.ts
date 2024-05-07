import { useQuery } from '@tanstack/react-query';

import { IMessageList, IMessages } from '@/app/types/message';
import { getMessages } from '@/app/(afterLogin)/messages/_lib/getMessages';

const useMessages = ({ roomId }: IMessages) => {
  const { data, isLoading, error } = useQuery<
    IMessageList[] | null,
    Object,
    IMessageList[],
    [_1: string, _2: string | undefined]
  >({
    queryKey: ['messages', roomId],
    queryFn: getMessages,
    enabled: !!roomId,
  });

  return { data, isLoading, error };
};

export default useMessages;
