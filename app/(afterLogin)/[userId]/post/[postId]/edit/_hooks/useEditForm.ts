import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';

import useOnAuth from '@/app/_hooks/useOnAuth';
import { updatePost } from '@/app/(afterLogin)/home/_services/updatePost';
import { usePreviewImage } from '@/app/_hooks/usePreviewImage';
import { usePostStore } from '@/app/_store/usePost';
import { IPostInputs } from '@/app/_types/post';
import { EditFormProps } from '@/app/(afterLogin)/[userId]/post/[postId]/edit/_components/EditForm';
import useGetSinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_hooks/useGetSinglePost';

const useEditForm = ({ userId, postId }: EditFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, loading } = useOnAuth();
  const { reset, parentPostId, mode } = usePostStore();
  const { data: initialPost } = useGetSinglePost({ postId });

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
  const { previewImage } = usePreviewImage({ watchImage });

  const updateFeed = useMutation({
    mutationFn: (data: IPostInputs) => updatePost({ user, data, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
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
