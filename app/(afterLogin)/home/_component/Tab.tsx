'use client';

import { useContext } from 'react';
import { TabContext } from '@/app/(afterLogin)/home/_component/TabProvider';

const Tab = () => {
  const { tab, setTab } = useContext(TabContext);

  const onClickMain = () => {
    setTab('main');
  };

  const onClickFollow = () => {
    setTab('fol');
  };

  return (
    <div className="grid w-full cursor-pointer grid-cols-2">
      <div
        className={`flex flex-col items-center border-b py-4 text-gray-400 ${tab === 'main' && 'border-black font-bold text-black'}`}
        onClick={onClickMain}
      >
        메인
      </div>
      <div
        className={`flex flex-col items-center border-b py-4 text-gray-400 ${tab === 'fol' && 'border-black font-bold text-black'}`}
        onClick={onClickFollow}
      >
        팔로잉
      </div>
    </div>
  );
};

export default Tab;
