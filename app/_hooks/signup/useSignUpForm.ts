import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import { usePreviewImage } from '@/app/_hooks/common/usePreviewImage';
import SignUp from '@/app/_api/users/signUp';

export interface SignUpInputs {
  name: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
  bio: string;
}

const useSignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({ mode: 'onSubmit' });
  const password = watch('password');
  const watchImage = watch('profileImage');
  const { previewImage } = usePreviewImage({ watchImage });

  const onSubmit: SubmitHandler<SignUpInputs> = async data => {
    const isSignUp = await SignUp(data);
    if (isSignUp) {
      router.replace('/home');
      toast.success('회원가입 완료');
    } else {
      toast.error('회원가입 실패');
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    previewImage,
    isSubmitting,
    password,
  };
};

export default useSignUpForm;
