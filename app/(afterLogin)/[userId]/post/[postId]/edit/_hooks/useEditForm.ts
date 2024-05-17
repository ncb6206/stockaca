import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { usePreviewImage } from '@/app/_hooks/usePreviewImage';
import { IPostId, IPostInputs } from '@/app/_types/post';
import useGetSinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_hooks/useGetSinglePost';
import useEditPost from '@/app/(afterLogin)/[userId]/post/[postId]/edit/_hooks/useEditPost';

const useEditForm = ({ postId }: IPostId) => {
  const { postData: initialPost } = useGetSinglePost({ postId });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IPostInputs>({ mode: 'onSubmit' });
  const watchImage = watch('photoUrl');
  const { previewImage } = usePreviewImage({ watchImage });
  const { updateFeed } = useEditPost({ postId });

  useEffect(() => {
    if (initialPost.post) {
      setValue('content', initialPost.post.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPost.post]);

  const onSubmit: SubmitHandler<IPostInputs> = async data => {
    await updateFeed.mutateAsync(data);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    previewImage,
    errors,
    isSubmitting,
    initialPost,
  };
};

export default useEditForm;
