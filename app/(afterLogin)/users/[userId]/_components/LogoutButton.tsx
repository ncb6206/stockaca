'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/(afterLogin)/users/[userId]/_services/logout';
import useOnAuth from '@/app/_hooks/useOnAuth';

interface ILogoutProps {
  userId: string;
}

const LogoutButton = ({ userId }: ILogoutProps) => {
  const { user } = useOnAuth();

  if (user?.displayName !== userId) {
    return null;
  }

  return (
    <Button onClick={logout} variant="outline">
      로그아웃
    </Button>
  );
};

export default LogoutButton;
