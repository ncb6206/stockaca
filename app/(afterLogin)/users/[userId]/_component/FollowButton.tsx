'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useOnAuth from '@/app/_lib/useOnAuth';
import { IFollowData } from '@/app/types/follow';
import { Button } from '@/components/ui/button';
import { follow } from '@/app/(afterLogin)/users/[userId]/_lib/follow';
import { unFollow } from '@/app/(afterLogin)/users/[userId]/_lib/unFollow';

interface IFollowProps {
  userId: string;
  followData: IFollowData;
}

const FollowButton = ({ userId, followData }: IFollowProps) => {
  const queryClient = useQueryClient();
  const { user } = useOnAuth();
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

  if (user?.displayName === userId) {
    return null;
  }

  return (
    <>
      {isFollow ? (
        <Button variant="outline" onClick={() => onUnFollow.mutate()}>
          팔로잉
        </Button>
      ) : (
        <Button onClick={() => onFollow.mutate()}>팔로우</Button>
      )}
    </>
  );
};

export default FollowButton;
