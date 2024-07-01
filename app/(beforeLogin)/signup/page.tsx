import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';

import SignUpForm from '@/app/_components/common/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="relative my-auto flex h-dvh w-full flex-col items-center justify-center">
      <div className="absolute left-0 top-0 m-5">
        <Link className="hover:cursor-pointer" href="/">
          <MdOutlineCancel size={28} />
        </Link>
      </div>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
