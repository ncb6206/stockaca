import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

import { postFollow } from '@/app/_api/users/postFollow';

interface IUseFollow {
  userId: string;
  displayName: string;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
}

const useFollowMutation = ({ userId, displayName, setIsFollow }: IUseFollow) => {
  const queryClient = useQueryClient();

  const onFollow = useMutation({
    mutationFn: postFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['follow', userId] });
      queryClient.invalidateQueries({
        queryKey: ['follow', displayName],
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
