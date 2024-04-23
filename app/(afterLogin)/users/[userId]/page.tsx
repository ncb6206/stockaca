import LogoutButton from '@/app/(afterLogin)/users/[userId]/_component/LogoutButton';

interface Props {
  params: { userId: string };
}

const UserPage = ({ params }: Props) => {
  return (
    <div className="flex flex-col">
      {params.userId}님의 페이지입니다.
      <LogoutButton />
    </div>
  );
};

export default UserPage;
