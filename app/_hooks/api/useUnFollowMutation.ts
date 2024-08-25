import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { deleteFollow } from '@/app/_api/users/deleteFollow';

interface IUseFollow {
  userId: string;
  displayName: string;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
}

const useUnFollowMutation = ({ userId, displayName, setIsFollow }: IUseFollow) => {
  const queryClient = useQueryClient();

  const onUnFollow = useMutation({
    mutationFn: deleteFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow', userId] });
      queryClient.invalidateQueries({
        queryKey: ['follow', displayName],
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
