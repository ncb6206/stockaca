'use client';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { auth } from '@/app/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log(userCredential);
      router.replace('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm space-y-8 overflow-x-auto p-2"
      >
        <Input
          {...register('email', { required: '이메일은 필수 입력 항목입니다.' })}
          id="email"
          placeholder="이메일 주소"
          type="email"
          name="email"
          className="border-0 bg-[#f5f5f5]"
        />
        {errors.email && (
          <p className="text-red-600">{errors.email?.message}</p>
        )}

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
          <p className="text-red-600">{errors.password?.message}</p>
        )}

        <Button type="submit">로그인</Button>
      </form>
    </>
  );
};

export default LoginForm;
