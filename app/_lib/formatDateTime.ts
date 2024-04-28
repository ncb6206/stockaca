import dayjs from 'dayjs';
import 'dayjs/locale/ko';

interface createdDayProps {
  createdAt: number;
}

export const formatDateTime = ({ createdAt }: createdDayProps) => {
  return dayjs(createdAt).locale('ko').format('YYYY년 M월 D일 A H시 m분');
};
