'use client';

import Image from 'next/image';

import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import SubmitButton from '@/app/_components/common/SubmitButton';
import { Avatar } from '@/components/ui/avatar';
import useSignUpForm from '@/app/_hooks/signup/useSignUpForm';
import FormError from '@/app/_components/common/FormError';

const SignUpForm = () => {
  const { handleSubmit, onSubmit, register, errors, previewImage, isSubmitting, password } = useSignUpForm();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-h-dvh w-full space-y-6 overflow-x-auto p-6 sm:p-20">
        <p className="text-center text-2xl font-bold">회원가입</p>
        <div>
          <Input
            {...register('name', { required: '이름은 필수 입력 항목입니다.' })}
            id="name"
            placeholder="이름"
            type="text"
            name="name"
            className="border-0 bg-[#f5f5f5]"
          />
          <FormError error={errors.name} />
        </div>

        <div>
          <Input
            {...register('nickname', {
              required: '닉네임은 필수 입력 항목입니다.',
            })}
            id="nickname"
            placeholder="닉네임"
            type="text"
            name="nickname"
            className="border-0 bg-[#f5f5f5]"
          />
          <FormError error={errors.nickname} />
        </div>

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
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  '비밀번호는 최소 8자 이상, 영어 대문자, 소문자, 숫자, 특수문자 중 3종류 문자 조합으로 구성해야 합니다.',
              },
            })}
            id="password"
            placeholder="비밀번호"
            type="password"
            name="password"
            className="border-0 bg-[#f5f5f5]"
          />
          <FormError error={errors.password} />
        </div>

        <div>
          <Input
            {...register('confirmPassword', {
              required: '비밀번호 확인은 필수 입력 항목입니다.',
              validate: value => value === password || '비밀번호가 일치하지 않습니다.',
            })}
            id="confirmPassword"
            placeholder="비밀번호 확인"
            type="password"
            name="confirmPassword"
            className="border-0 bg-[#f5f5f5]"
          />
          <FormError error={errors.confirmPassword} />
        </div>

        <div className="grid w-full max-w-screen-sm items-center">
          <Label htmlFor="profileImage">프로필 이미지</Label>
          <Input
            {...register('profileImage', {
              required: '프로필 이미지는 필수 입력 항목입니다.',
            })}
            id="profileImage"
            placeholder="프로필 이미지"
            type="file"
            name="profileImage"
            className="hidden"
          />
          <label className="mt-3 rounded-xl hover:cursor-pointer" htmlFor="profileImage">
            <Avatar className="h-28 w-28">
              {previewImage && (
                <Image
                  src={typeof previewImage === 'string' ? previewImage : ''}
                  alt="미리보기"
                  width={120}
                  height={120}
                />
              )}
              {!previewImage && <Skeleton className="h-full w-full" />}
            </Avatar>
          </label>
          <FormError error={errors.profileImage} />
        </div>

        <div>
          <Textarea
            {...register('bio', { required: '인사말은 필수 입력 항목입니다.' })}
            id="bio"
            placeholder="인삿말을 작성해주세요!"
            name="bio"
            className="border-0 bg-[#f5f5f5]"
          />
          <FormError error={errors.bio} />
        </div>

        <div className="flex justify-end">
          <SubmitButton isSubmitting={isSubmitting} label="회원가입" />
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
