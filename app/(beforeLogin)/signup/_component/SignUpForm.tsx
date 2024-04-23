'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { handleUpload } from '@/app/(BeforeLogin)/_lib/handleUpload';
import { dayjsNow } from '@/app/(BeforeLogin)/_lib/setDate';
import { auth, db } from '@/app/firebase';

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
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInputs>({ mode: 'onSubmit' });
  const password = watch('password');

  const onSubmit: SubmitHandler<SignUpInputs> = async data => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;
      const imageUrl = await handleUpload(data.profileImage[0]);
      await updateProfile(user, {
        displayName: data.nickname,
        photoURL: imageUrl,
      });
      const collectionUser = doc(db, 'User', user.uid);
      await setDoc(collectionUser, {
        name: data.name,
        email: user.email,
        nickname: user.displayName,
        password: data.password,
        profileImage: user.photoURL,
        bio: data.bio,
        createdAt: dayjsNow(),
        updatedAt: dayjsNow(),
      });

      if (userCredential.user) {
        router.replace('/home');
        toast.success('회원가입 완료');
      }
    } catch (error) {
      console.log((error as Error).message);
      toast.error('회원가입 실패');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-dvh w-full space-y-6 overflow-x-auto p-6 sm:p-20"
      >
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
          {errors.name && (
            <p className="mt-2 text-red-600">{errors.name?.message}</p>
          )}
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
          {errors.nickname && (
            <p className="mt-2 text-red-600">{errors.nickname?.message}</p>
          )}
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
          {errors.email && (
            <p className="mt-2 text-red-600">{errors.email?.message}</p>
          )}
        </div>

        <div>
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
            <p className="mt-2 text-red-600">{errors.password?.message}</p>
          )}
        </div>

        <div>
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
            <p className="mt-2 text-red-600">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>

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
            <p className="mt-2 text-red-600">{errors.profileImage?.message}</p>
          )}
        </div>

        <div>
          <Textarea
            {...register('bio', { required: '인사말은 필수 입력 항목입니다.' })}
            id="bio"
            placeholder="인삿말을 작성해주세요!"
            name="bio"
            className="border-0 bg-[#f5f5f5]"
          />
          {errors.bio && (
            <p className="mt-2 text-red-600">{errors.bio?.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          {!isSubmitting && <Button type="submit">회원가입</Button>}
          {isSubmitting && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              회원가입 중...
            </Button>
          )}
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
