import LogoutButton from '@/app/(afterLogin)/users/[userId]/_component/LogoutButton';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <div className="flex h-full w-full flex-col">
      <div className="flex-grow p-4">
        <div className="mb-4 flex flex-col justify-center gap-2">
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-bold">{userData?.nickname}</p>
              <p>{userData?.email}</p>
            </div>
            <Avatar className="h-14 w-14">
              <AvatarImage src={userData?.profileImage} />
              <AvatarFallback>
                {userData?.email.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <p>{userData?.bio}</p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserPage;
