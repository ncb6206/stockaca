import { useQuery } from '@tanstack/react-query';

import { IPostListData } from '@/app/types/post';
import { getFollowingPostList } from '@/app/(afterLogin)/home/_lib/getFollowingPostList';
import { User } from 'firebase/auth';

type IUseFollowPostList = { user: User | null };

const useFollowPostList = ({ user }: IUseFollowPostList) => {
  const { data, isLoading } = useQuery<
    IPostListData[] | null,
    Object,
    IPostListData[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ['post', user?.displayName as string, 'following'],
    queryFn: getFollowingPostList,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!user?.displayName,
  });

  return { isLoading, data };
};

export default useFollowPostList;
