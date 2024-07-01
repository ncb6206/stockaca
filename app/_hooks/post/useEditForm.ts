import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { usePreviewImage } from '@/app/_hooks/common/usePreviewImage';
import { IPostId, IPostInputs } from '@/app/_types/post';
import useSinglePostQuery from '@/app/_hooks/api/useSinglePostQuery';
import useEditPostMutation from '@/app/_hooks/api/useEditPostMutation';

const useEditForm = ({ postId }: IPostId) => {
  const { postData: initialPost } = useSinglePostQuery({ postId });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IPostInputs>({ mode: 'onSubmit' });
  const watchImage = watch('photoUrl');
  const { previewImage } = usePreviewImage({ watchImage });
  const { updateFeed } = useEditPostMutation({ postId });

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
