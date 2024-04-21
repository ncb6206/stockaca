import { auth } from '@/app/firebase';
import { redirect } from 'next/navigation';
import Main from '@/app/(beforeLogin)/_component/Main';

const Home = () => {
  return (
    <>
      <Main />
    </>
  );
};

export default Home;
