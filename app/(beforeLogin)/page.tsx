import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Logo from '../../public/logo.png';

const Home = () => {
  return (
    <>
      <div className="flex h-dvh w-full flex-col items-center justify-center px-10">
        <div className="my-4 flex flex-col items-center gap-2">
          <Image src={Logo} alt="logo" width={90} />
          <p className="text-3xl font-bold">
            지금 당신의 계좌에 일어나고 있는 일
          </p>
        </div>
        <div className="flex w-7/12 flex-col sm:px-6">
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/login">로그인</Link>
          </Button>
          <hr className="my-4 w-full" />
          <Button asChild className="rounded-xl">
            <Link href="/signup">계정 만들기</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
