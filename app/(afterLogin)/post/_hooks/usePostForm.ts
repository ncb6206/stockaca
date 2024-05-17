import { useForm, SubmitHandler } from 'react-hook-form';

import { usePreviewImage } from '@/app/_hooks/usePreviewImage';
import { IPostInputs } from '@/app/_types/post';
import useWritePost from '@/app/(afterLogin)/post/_hooks/useWritePost';

const usePostForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IPostInputs>({ mode: 'onSubmit' });
  const watchImage = watch('photoUrl');
  const { previewImage } = usePreviewImage({ watchImage });
  const { writeFeed } = useWritePost();

  const onSubmit: SubmitHandler<IPostInputs> = async data => {
    await writeFeed.mutateAsync(data);
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
