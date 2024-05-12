import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/app/firebase';

interface LoginInputs {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      if (userCredential.user) {
        router.replace('/home');
        toast.success('로그인 완료');
      }
    } catch (error) {
      console.log((error as Error).message);
      toast.error('로그인 실패');
    }
  };

  return { handleSubmit, onSubmit, register, errors, isSubmitting };
};

export default useLoginForm;
