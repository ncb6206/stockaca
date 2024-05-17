'use client';

import Image from 'next/image';

import { Avatar } from '@/components/ui/avatar';

interface IPostUserImage {
  profileImage?: string;
}

const PostUserImage = ({ profileImage }: IPostUserImage) => {
  return (
    <Avatar className="mr-2">
      {profileImage && (
        <Image
          src={profileImage}
          alt="프로필 사진"
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
      )}
    </Avatar>
  );
};

export default PostUserImage;
