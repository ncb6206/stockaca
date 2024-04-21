'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/app/(AfterLogin)/users/[userId]/_lib/logout';

const LogoutButton = () => {
  return (
    <Button onClick={logout} className="mx-2">
      로그아웃
    </Button>
  );
};

export default LogoutButton;
