'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { auth } from '@/app/firebase';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/ui/SubmitButton';

interface LoginInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
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

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-dvh w-full space-y-8 overflow-x-auto p-6 sm:p-20"
      >
        <p className="text-center text-2xl font-bold">로그인</p>
        <div>
          <Input
            {...register('email', {
              required: '이메일은 필수 입력 항목입니다.',
            })}
            id="email"
            placeholder="이메일 주소"
            type="email"
            name="email"
            className="border-0 bg-[#f5f5f5]"
          />
          {errors.email && (
            <p className="mt-2 text-red-600">{errors.email?.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register('password', {
              required: '비밀번호는 필수 입력 항목입니다.',
            })}
            id="password"
            placeholder="비밀번호"
            type="password"
            name="password"
            className="border-0 bg-[#f5f5f5]"
          />
          {errors.password && (
            <p className="mt-2 text-red-600">{errors.password?.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <SubmitButton isSubmitting={isSubmitting} label="로그인" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
