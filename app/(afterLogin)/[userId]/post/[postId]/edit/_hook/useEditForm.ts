import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';

import useOnAuth from '@/app/_lib/useOnAuth';
import { updatePost } from '@/app/(afterLogin)/home/_lib/updatePost';
import { PreviewImage } from '@/app/(beforeLogin)/signup/_lib/PreviewImage';
import { usePostStore } from '@/app/store/usePost';
import { IPostInputs } from '@/app/types/post';
import { EditFormProps } from '@/app/(afterLogin)/[userId]/post/[postId]/edit/_component/EditForm';
import useGetSinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_hook/useGetSinglePost';

const useEditForm = ({ userId, postId }: EditFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, loading } = useOnAuth();
  const { reset, parentPostId, mode } = usePostStore();
  const { data: initialPost } = useGetSinglePost({ userId, postId });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IPostInputs>({ mode: 'onSubmit' });

  useEffect(() => {
    if (initialPost) {
      setValue('content', initialPost.content);
    }
  }, [initialPost, setValue]);

  const watchImage = watch('photoUrl');
  const previewImage = PreviewImage({ watchImage });

  const updateFeed = useMutation({
    mutationFn: (data: IPostInputs) => updatePost({ user, data, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: [userId, 'post', postId] });
      if (parentPostId) {
        queryClient.invalidateQueries({
          queryKey: ['post', parentPostId, 'comments'],
        });
      }
      router.back();
      toast.success('게시물이 수정되었습니다!');
    },
    onError: error => {
      console.error('Error editing post:', error);
      toast.error('게시물 수정 실패');
    },
    onSettled: () => {
      reset();
    },
  });

  const onSubmit: SubmitHandler<IPostInputs> = data => {
    updateFeed.mutate(data);
  };

  return {
    updateFeed,
    onSubmit,
    register,
    handleSubmit,
    previewImage,
    user,
    loading,
    errors,
    isSubmitting,
    mode,
    initialPost,
  };
};

export default useEditForm;
