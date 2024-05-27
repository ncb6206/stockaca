'use client';

import dynamic from 'next/dynamic';

import useFollowModalStore from '@/app/_store/useFollowModal';
import useGetFollowData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetFollowData';
import { Skeleton } from '@/components/ui/skeleton';
import { IUserId } from '@/app/_types/user';

const FollowModal = dynamic(
  () => import('@/app/(afterLogin)/users/[userId]/_components/FollowModal'),
  { ssr: false },
);

const FollowInfo = ({ userId }: IUserId) => {
  const { onOpen, onSetUserId } = useFollowModalStore();
  const { data: followData, isLoading: followLoading } = useGetFollowData({
    userId,
  });

  const onOpenFollowModal = () => {
    onSetUserId(userId);
    onOpen();
  };

  if (followLoading) {
    return <Skeleton className="h-4 w-40" />;
  }

  return (
    <>
      <div
        className="flex gap-4 hover:cursor-pointer hover:underline"
        onClick={onOpenFollowModal}
      >
        <div>
          <p>
            팔로워
            <span className="mx-1 font-bold">
              {followData?.followerUserId.length}
            </span>
          </p>
        </div>
        <div>
          <p>
            팔로잉
            <span className="mx-1 font-bold">
              {followData?.followingUserId.length}
            </span>
          </p>
        </div>
      </div>
      <FollowModal />
    </>
  );
};

export default FollowInfo;
