'use client';

import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlinePicture } from 'react-icons/ai';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import useOnAuth from '@/app/_lib/useOnAuth';
import { Avatar } from '@/components/ui/avatar';
import SubmitButton from '@/components/ui/SubmitButton';
import { PreviewImage } from '@/app/(beforeLogin)/signup/_lib/PreviewImage';
import { updatePost } from '@/app/(afterLogin)/home/_lib/updatePost';
import { IPostInputs } from '@/app/types/post';
import { getPost } from '@/app/(afterLogin)/[userId]/post/[postId]/_lib/getPost';
import { useEffect } from 'react';

interface EditFormProps {
  userId: string;
  postId: string;
}

const EditForm = ({ userId, postId }: EditFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: initialPost } = useQuery({
    queryKey: [userId, 'post', postId],
    queryFn: getPost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!userId && !!postId,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IPostInputs>({ mode: 'onSubmit' });

  useEffect(() => {
    if (initialPost) {
      setValue('content', initialPost.content);
    }
  }, [initialPost, setValue]);

  const { user } = useOnAuth();
  const watchImage = watch('photoUrl');
  const previewImage = PreviewImage({ watchImage });

  const updateFeed = useMutation({
    mutationFn: (data: IPostInputs) => updatePost({ user, data, postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: [userId, 'post', postId] });
      router.replace('/home');
      toast.success('게시물이 수정되었습니다!');
    },
    onError: error => {
      console.error('Error editing post:', error);
      toast.error('게시물 수정 실패');
    },
  });

  const onSubmit: SubmitHandler<IPostInputs> = data => {
    if (user?.displayName === userId) {
      updateFeed.mutate(data);
    } else {
      toast.error('게시물 작성자가 아닙니다');
      router.replace('/home');
    }
  };

  return (
    <div className="relative flex h-full max-h-dvh w-full flex-col ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6 overflow-x-auto p-6"
      >
        <div className="flex flex-row gap-4">
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
              {!previewImage && initialPost?.photoUrl[0] && (
                <Image
                  src={initialPost?.photoUrl[0]}
                  alt="미리보기"
                  width={500}
                  height={500}
                />
              )}
              {previewImage && (
                <Image
                  src={previewImage as string}
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
        <div className="fixed bottom-0 left-0 z-30 flex h-16 w-full items-center justify-end bg-background p-4 sm:max-w-screen-sm">
          <SubmitButton
            isSubmitting={isSubmitting}
            label="게시"
            className="rounded-3xl text-base font-bold"
          />
        </div>
      </form>
    </div>
  );
};

export default EditForm;
