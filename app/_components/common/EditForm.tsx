'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlinePicture } from 'react-icons/ai';

import { Avatar } from '@/components/ui/avatar';
import SubmitButton from '@/components/ui/SubmitButton';
import useEditForm from '@/app/(afterLogin)/[userId]/post/[postId]/edit/_hooks/useEditForm';
import useOnAuth from '@/app/_hooks/useOnAuth';
import { usePostStore } from '@/app/_store/usePost';
import { IPostParams } from '@/app/_types/post';

const EditForm = ({ userId, postId }: IPostParams) => {
  const router = useRouter();
  const { user, loading } = useOnAuth();
  const { mode } = usePostStore();
  const { onSubmit, register, handleSubmit, previewImage, errors, isSubmitting, initialPost } = useEditForm({ postId });

  if (!loading && user?.displayName !== userId) {
    router.replace('/home');
  }

  return (
    <div className="relative flex h-dvh max-h-dvh w-full flex-col ">
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-full space-y-6 overflow-x-auto">
        {mode === 'comment' && <p className="font-bold">답글 수정</p>}
        <div className="flex flex-row gap-4 p-4">
          <Avatar className="h-16 w-16">
            {user?.photoURL && (
              <Image
                src={user?.photoURL}
                alt="프로필 사진"
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            )}
          </Avatar>
          <div className="flex w-full flex-col gap-4">
            <p className="font-semibold">{user?.email}</p>
            <TextareaAutosize
              {...register('content', { required: '내용을 입력해주세요!' })}
              id="content"
              placeholder="하고 싶은 얘기를 적어보세요!"
              name="content"
              minRows={3}
              maxRows={20}
            />
            {errors.content && <p className="mt-2 text-red-600">{errors.content?.message}</p>}

            <div className="grid w-full max-w-screen-sm items-center">
              <input
                {...register('photoUrl')}
                id="photoUrl"
                placeholder="업로드 이미지"
                type="file"
                name="photoUrl"
                className="hidden"
              />
              {!previewImage && initialPost?.post?.photoUrl[0] && (
                <Image src={initialPost?.post?.photoUrl[0]} alt="미리보기" width={500} height={500} />
              )}
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
              <label htmlFor="photoUrl" className="flex flex-row items-center gap-2 hover:cursor-pointer">
                <AiOutlinePicture size={20} />
                <span>추가</span>
              </label>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 z-30 flex h-16 w-full max-w-screen-sm items-center justify-end bg-background">
          <SubmitButton isSubmitting={isSubmitting} label="게시" className="mr-3 rounded-3xl text-base font-bold" />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
