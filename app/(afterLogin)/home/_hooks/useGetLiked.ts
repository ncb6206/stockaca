import { useQuery } from '@tanstack/react-query';

import { ILikeData } from '@/app/_types/like';
import { getLike } from '@/app/(afterLogin)/home/_services/getLike';

const useGetLiked = ({ userId, postId }: ILikeData) => {
  return useQuery({
    queryKey: ['like', userId, postId],
    queryFn: () => getLike({ userId, postId }),
    enabled: Boolean(userId && postId),
  });
};

export default useGetLiked;
