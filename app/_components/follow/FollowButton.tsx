'use client';

import { IFollowData } from '@/app/_types/follow';
import { Button } from '@/components/ui/button';
import useFollowMutation from '@/app/_hooks/api/useFollowMutation';
import useFollowStatus from '@/app/_hooks/follow/useFollowStatus';
import useUnFollowMutation from '@/app/_hooks/api/useUnFollowMutation';
import useOnAuth from '@/app/_hooks/common/useOnAuth';

interface IFollowProps {
  userId: string;
  followData: IFollowData;
}

const FollowButton = ({ userId, followData }: IFollowProps) => {
  const { user, loading } = useOnAuth();
  const { isFollow, setIsFollow } = useFollowStatus({
    user,
    followData,
  });
  const { onFollow } = useFollowMutation({
    userId,
    user,
    setIsFollow,
  });
  const { onUnFollow } = useUnFollowMutation({
    userId,
    user,
    setIsFollow,
  });

  const handleToggleFollow = () => {
    if (isFollow) {
      onUnFollow.mutate();
    } else {
      onFollow.mutate();
    }
  };

  if (loading || user?.displayName === userId) {
    return null;
  }

  return (
    <>
      {isFollow ? (
        <Button variant="outline" onClick={handleToggleFollow}>
          팔로잉
        </Button>
      ) : (
        <Button onClick={handleToggleFollow}>팔로우</Button>
      )}
    </>
  );
};

export default FollowButton;
