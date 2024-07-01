import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

import { IFollowData } from '@/app/_types/follow';

interface IUseFollowStatus {
  user: User | null;
  followData: IFollowData;
}

const useFollowStatus = ({ user, followData }: IUseFollowStatus) => {
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    setIsFollow(followData?.followerUserId.includes(user?.displayName ?? ''));
  }, [followData?.followerUserId, user?.displayName]);

  return { isFollow, setIsFollow };
};

export default useFollowStatus;
