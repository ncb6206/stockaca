'use client';

import { Input } from '@/components/ui/input';
import SubmitButton from '@/app/_components/common/SubmitButton';
import useLoginForm from '@/app/_hooks/login/useLoginForm';
import FormError from '@/app/_components/common/FormError';

const LoginForm = () => {
  const { handleSubmit, onSubmit, register, errors, isSubmitting } = useLoginForm();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-dvh w-full space-y-8 overflow-x-auto p-6 sm:p-20">
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
          <FormError error={errors.email} />
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
          <FormError error={errors.password} />
        </div>

        <div className="flex justify-end">
          <SubmitButton isSubmitting={isSubmitting} label="로그인" />
        </div>
      </form>
    </>
  );
};

export default LoginForm;
