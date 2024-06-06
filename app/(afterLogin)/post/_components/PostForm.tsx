'use client';

import Image from 'next/image';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlinePicture } from 'react-icons/ai';

import SubmitButton from '@/components/ui/SubmitButton';
import usePostForm from '@/app/(afterLogin)/post/_hooks/usePostForm';
import { usePostStore } from '@/app/_store/usePost';
import useOnAuth from '@/app/_hooks/useOnAuth';
import UserProfileImage from '@/app/(afterLogin)/_components/UserProfileImage';

const PostForm = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    previewImage,
    isSubmitting,
  } = usePostForm();
  const { user } = useOnAuth();
  const { mode } = usePostStore();

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex h-dvh max-h-dvh w-full flex-col space-y-6 overflow-x-auto"
      >
        {mode === 'comment' && <p className="font-bold">답글 작성</p>}
        <div className="flex flex-row gap-4 p-6">
          <UserProfileImage
            className="h-16 w-16"
            src={user?.photoURL}
            alt="프로필 사진"
            width={300}
            height={300}
          />
          <div className="flex w-full flex-col gap-4">
            <p className="font-semibold">{user?.email}</p>
            <TextareaAutosize
              {...register('content', { required: '내용을 입력해주세요!' })}
              id="content"
              placeholder="하고 싶은 얘기를 적어보세요!"
              name="content"
              minRows={3}
              maxRows={20}
              className="p-2"
            />
            {errors.content && (
              <p className="mt-2 text-red-600">{errors.content?.message}</p>
            )}

            <div className="grid w-full max-w-screen-sm items-center">
              <input
                {...register('photoUrl')}
                id="photoUrl"
                placeholder="업로드 이미지"
                type="file"
                name="photoUrl"
                className="hidden"
              />
              {previewImage && (
                <Image
                  src={typeof previewImage === 'string' ? previewImage : ''}
                  alt="미리보기"
                  width={500}
                  height={500}
                />
              )}
            </div>
            <div className="flex flex-row">
              <label
                htmlFor="photoUrl"
                className="flex flex-row items-center gap-2 hover:cursor-pointer"
              >
                <AiOutlinePicture size={20} />
                <span>추가</span>
              </label>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 z-30 flex h-16 w-full max-w-screen-sm items-center justify-end bg-background">
          <SubmitButton
            isSubmitting={isSubmitting}
            label="게시"
            className="mr-3 rounded-3xl text-base font-bold"
          />
        </div>
      </form>
    </>
  );
};

export default PostForm;
