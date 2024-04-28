import { useQuery } from '@tanstack/react-query';

import { ILikeData } from '@/app/types/like';
import { getLike } from '@/app/(afterLogin)/home/_lib/getLike';

const useLike = ({ userId, postId }: ILikeData) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['like', userId, postId],
    queryFn: () => getLike({ userId, postId }),
    enabled: !!userId && !!postId,
  });

  return { data, isLoading, isError };
};

export default useLike;
