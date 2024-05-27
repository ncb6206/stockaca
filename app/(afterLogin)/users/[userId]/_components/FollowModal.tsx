'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useFollowModalStore from '@/app/_store/useFollowModal';
import FollowCard from '@/app/(afterLogin)/users/[userId]/_components/FollowCard';
import useGetFollowData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetFollowData';

type selectedType = 'follower' | 'following';

const FollowModal = () => {
  const { isOpen, onChange, userId } = useFollowModalStore();
  const { data: followData } = useGetFollowData({ userId });
  const [selectedTab, setSelectedTab] = useState<selectedType>('follower');

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="max-h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>팔로우 / 팔로잉 목록</DialogTitle>
        </DialogHeader>
        <div className="my-2 flex flex-col">
          <div className="grid cursor-pointer grid-cols-2">
            <div
              className={`flex flex-col items-center border-b pb-2 ${selectedTab === 'follower' && 'border-black font-bold'}`}
              onClick={() => setSelectedTab('follower')}
            >
              <p>팔로워</p>
            </div>
            <div
              className={`flex flex-col items-center border-b pb-2 ${selectedTab === 'following' && 'border-black font-bold'}`}
              onClick={() => setSelectedTab('following')}
            >
              <p>팔로잉</p>
            </div>
          </div>
          {selectedTab === 'follower' &&
            followData?.followerUserId.map(user => (
              <FollowCard key={user} userId={user} />
            ))}
          {selectedTab === 'following' &&
            followData?.followingUserId.map(user => (
              <FollowCard key={user} userId={user} />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FollowModal;
