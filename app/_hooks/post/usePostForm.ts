import { useForm, SubmitHandler } from 'react-hook-form';

import { usePreviewImage } from '@/app/_hooks/common/usePreviewImage';
import { IPostInputs } from '@/app/_types/post';
import useWritePostMutation from '@/app/_hooks/api/useWritePostMutation';
import { usePostStore } from '@/app/_store/usePost';
import useOnAuth from '@/app/_hooks/common/useOnAuth';

const usePostForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IPostInputs>({ mode: 'onSubmit' });
  const watchImage = watch('photoUrl');
  const { user } = useOnAuth();
  const { parentPostId } = usePostStore();
  const { previewImage } = usePreviewImage({ watchImage });
  const { writeFeed } = useWritePostMutation();

  const onSubmit: SubmitHandler<IPostInputs> = async data => {
    await writeFeed.mutateAsync({ user, data, parentPostId });
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    previewImage,
    isSubmitting,
  };
};

export default usePostForm;
