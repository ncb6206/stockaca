'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { handleUpload } from '@/app/(beforeLogin)/_lib/handleUpload';
import { auth, db } from '@/app/firebase';
import { dayjsNow } from '@/app/(beforeLogin)/_lib/setDate';

interface SignUpInputs {
  name: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputs>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<SignUpInputs> = async data => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const imageUrl = await handleUpload(data.profileImage[0]);
      const collectionUser = doc(db, 'User', auth.currentUser?.uid as string);
      await setDoc(collectionUser, {
        name: data.name,
        email: data.email,
        nickname: data.nickname,
        password: data.password,
        profileImage: imageUrl,
        bio: data.bio,
        createdAt: dayjsNow(),
        updatedAt: dayjsNow(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const password = watch('password');

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm space-y-8 overflow-x-auto p-2"
      >
        <Input
          {...register('name', { required: '이름은 필수 입력 항목입니다.' })}
          id="name"
          placeholder="이름"
          type="text"
          name="name"
          className="border-0 bg-[#f5f5f5]"
        />
        {errors.name && <p className="text-red-600">{errors.name?.message}</p>}

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
        {errors.nickname && (
          <p className="text-red-600">{errors.nickname?.message}</p>
        )}

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
            pattern: {
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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
        {errors.password && (
          <p className="text-red-600">{errors.password?.message}</p>
        )}

        <Input
          {...register('confirmPassword', {
            required: '비밀번호 확인은 필수 입력 항목입니다.',
            validate: value =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
          id="confirmPassword"
          placeholder="비밀번호 확인"
          type="password"
          name="confirmPassword"
          className="border-0 bg-[#f5f5f5]"
        />
        {errors.confirmPassword && (
          <p className="text-red-600">{errors.confirmPassword?.message}</p>
        )}

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="profileImage">프로필 이미지</Label>
          <Input
            {...register('profileImage', {
              required: '프로필 이미지는 필수 입력 항목입니다.',
            })}
            id="profileImage"
            placeholder="프로필 이미지"
            type="file"
            name="profileImage"
            className="border-0 bg-[#f5f5f5] hover:cursor-pointer"
          />
          {errors.profileImage && (
            <p className="text-red-600">{errors.profileImage?.message}</p>
          )}
        </div>

        <Textarea
          {...register('bio', { required: '인사말은 필수 입력 항목입니다.' })}
          id="bio"
          placeholder="인삿말을 작성해주세요!"
          name="bio"
          className="border-0 bg-[#f5f5f5]"
        />
        {errors.bio && <p className="text-red-600">{errors.bio?.message}</p>}

        <Button type="submit">회원가입</Button>
      </form>
    </>
  );
};

export default SignUpForm;
