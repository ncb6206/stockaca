'use client';

import Image from 'next/image';

interface IPostImages {
  photoUrl: string[];
}

const PostImages = ({ photoUrl }: IPostImages) => {
  return (
    <>
      {photoUrl?.map((url: string) => (
        <Image
          key={url}
          src={url}
          alt="게시물 사진"
          width={700}
          height={400}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          className="my-2 rounded-md border"
        />
      ))}
    </>
  );
};

export default PostImages;
