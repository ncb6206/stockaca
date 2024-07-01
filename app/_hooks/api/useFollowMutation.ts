import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { User } from 'firebase/auth';

import { postFollow } from '@/app/_api/users/postFollow';

interface IUseFollow {
  userId: string;
  user: User | null;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
}

const useFollowMutation = ({ userId, user, setIsFollow }: IUseFollow) => {
  const queryClient = useQueryClient();

  const onFollow = useMutation({
    mutationFn: () =>
      postFollow({
        currentUserId: user?.displayName ?? '',
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

  return { onFollow };
};

export default useFollowMutation;
