import LogoutButton from '@/app/(afterLogin)/users/[userId]/_component/LogoutButton';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';
import Image from 'next/image';

interface Props {
  params: { userId: string };
}

const UserPage = async ({ params }: Props) => {
  const userId = decodeURIComponent(params.userId);
  const userData = await getUser({ email: userId });
  console.log(userData);

  if (!userData) {
    return <div>이런! 사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col">
      <p>{userData?.name}</p>
      <p>{userData?.nickname}</p>
      <p>{userData?.bio}</p>
      <p>{userData?.email}님의 페이지입니다.</p>
      <Image
        src={userData?.profileImage}
        alt="프로필 사진"
        width={300}
        height={300}
      />
      <LogoutButton />
    </div>
  );
};

export default UserPage;
