'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/(afterLogin)/users/[userId]/_lib/logout';
import useOnAuth from '@/app/_lib/useOnAuth';

interface LogoutButtonProps {
  userId: string;
}

const LogoutButton = ({ userId }: LogoutButtonProps) => {
  const { user } = useOnAuth();

  return (
    <Button
      onClick={logout}
      className="mx-2"
      hidden={user?.displayName !== userId}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
