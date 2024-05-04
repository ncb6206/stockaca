import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import { PreviewImage } from '@/app/(beforeLogin)/signup/_lib/PreviewImage';
import useOnAuth from '@/app/_lib/useOnAuth';
import { usePostStore } from '@/app/store/usePost';
import { IPostInputs } from '@/app/types/post';
import { writePost } from '@/app/(afterLogin)/home/_lib/writePost';

const usePostForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IPostInputs>({ mode: 'onSubmit' });
  const { user } = useOnAuth();
  const { mode, parentPostId, reset } = usePostStore();
  const watchImage = watch('photoUrl');
  const previewImage = PreviewImage({ watchImage });

  const writeFeed = useMutation({
    mutationFn: (data: IPostInputs) => writePost({ user, data, parentPostId }),
    onSuccess: () => {
      if (parentPostId) {
        queryClient.invalidateQueries({
          queryKey: ['post', parentPostId, 'comments'],
        });
        queryClient.invalidateQueries({
          queryKey: [user?.displayName, 'post', parentPostId],
        });
        router.back();
      } else {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        router.replace('/home');
      }
      toast.success('게시물이 작성되었습니다!');
    },
    onError: error => {
      console.error('Error writing post:', error);
      toast.error('게시물 작성 실패');
    },
    onSettled: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<IPostInputs> = data => {
    writeFeed.mutate(data);
  };

  return {
    handleSubmit,
    onSubmit,
    mode,
    user,
    register,
    errors,
    previewImage,
    isSubmitting,
  };
};

export default usePostForm;
