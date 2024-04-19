import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const dayjsNow = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};
