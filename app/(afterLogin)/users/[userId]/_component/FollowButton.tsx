'use client';

import useOnAuth from '@/app/_lib/useOnAuth';
import { IFollowData } from '@/app/types/follow';
import { Button } from '@/components/ui/button';
import useFollow from '@/app/(afterLogin)/users/[userId]/_hook/useFollow';

interface IFollowProps {
  userId: string;
  followData: IFollowData;
}

const FollowButton = ({ userId, followData }: IFollowProps) => {
  const { user } = useOnAuth();
  const { isFollow, onUnFollow, onFollow } = useFollow({
    userId,
    user,
    followData,
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
