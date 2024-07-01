import Image from 'next/image';

import { Avatar } from '@/components/ui/avatar';

interface IUserProfileImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

const UserProfileImage = ({ src, alt, className, width, height }: IUserProfileImageProps) => {
  if (!src) {
    return null;
  }

  return (
    <Avatar className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
      />
    </Avatar>
  );
};

export default UserProfileImage;
