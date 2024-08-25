import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import useOnAuth from '@/app/_hooks/common/useOnAuth';
import { usePreviewImage } from '@/app/_hooks/common/usePreviewImage';
import { IPostId, IPostInputs } from '@/app/_types/post';
import useSinglePostQuery from '@/app/_hooks/api/useSinglePostQuery';
import usePostMutation from '@/app/_hooks/api/usePostMutation';

const useEditForm = ({ postId }: IPostId) => {
  const { user } = useOnAuth();
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
  const { postMutation } = usePostMutation({ postId });

  useEffect(() => {
    if (initialPost.post) {
      setValue('content', initialPost.post.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPost.post]);

  const onSubmit: SubmitHandler<IPostInputs> = async data => {
    await postMutation.mutateAsync({ user, data, postId });
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
