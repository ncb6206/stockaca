import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { User } from 'firebase/auth';

import { deleteFollow } from '@/app/_api/users/deleteFollow';

interface IUseFollow {
  userId: string;
  user: User | null;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
}

const useUnFollowMutation = ({ userId, user, setIsFollow }: IUseFollow) => {
  const queryClient = useQueryClient();

  const onUnFollow = useMutation({
    mutationFn: () =>
      deleteFollow({
        currentUserId: user?.displayName ?? '',
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

  return { onUnFollow };
};

export default useUnFollowMutation;
