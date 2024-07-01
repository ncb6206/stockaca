'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/_api/users/logout';
import { IUserId } from '@/app/_types/user';
import useOnAuth from '@/app/_hooks/common/useOnAuth';

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
