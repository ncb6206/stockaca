import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { User } from 'firebase/auth';

import { follow } from '@/app/(afterLogin)/users/[userId]/_lib/follow';
import { unFollow } from '@/app/(afterLogin)/users/[userId]/_lib/unFollow';
import { IFollowData } from '@/app/types/follow';

interface IUseFollow {
  userId: string;
  user: User | null;
  followData: IFollowData;
}

const useFollow = ({ userId, user, followData }: IUseFollow) => {
  const queryClient = useQueryClient();
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(
      followData?.followerUserId.includes(user?.displayName as string),
    );
  }, [followData?.followerUserId, user?.displayName]);

  const onFollow = useMutation({
    mutationFn: () =>
      follow({
        currentUserId: user?.displayName as string,
        targetUserId: userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow', userId] });
      queryClient.invalidateQueries({
        queryKey: ['follow', user?.displayName],
      });
      setIsFollow(true);
      toast.success('팔로우 완료');
    },
    onError: error => {
      console.error('Error follow user:', error);
      toast.error('팔로우 실패');
    },
  });

  const onUnFollow = useMutation({
    mutationFn: () =>
      unFollow({
        currentUserId: user?.displayName as string,
        targetUserId: userId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow', userId] });
      queryClient.invalidateQueries({
        queryKey: ['follow', user?.displayName],
      });
      setIsFollow(false);
      toast.success('언팔로우 완료');
    },
    onError: error => {
      console.error('Error follow user:', error);
      toast.error('언팔로우 실패');
    },
  });

  return { isFollow, onUnFollow, onFollow };
};

export default useFollow;
