'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/(afterLogin)/users/[userId]/_services/logout';
import useOnAuth from '@/app/_hooks/useOnAuth';
import { IUserId } from '@/app/_types/user';

const LogoutButton = ({ userId }: IUserId) => {
  const { user, loading } = useOnAuth();

  if (loading || user?.displayName !== userId) {
    return null;
  }

  return (
    <Button onClick={logout} variant="outline">
      로그아웃
    </Button>
  );
};

export default LogoutButton;
