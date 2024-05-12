import { createHash } from 'crypto';

interface hashUidProps {
  uid: string;
}

export const hashUid = ({ uid }: hashUidProps) => {
  const hash = createHash('sha256');
  hash.update(uid);
  const hashedUid = hash.digest('hex');

  return hashedUid;
};
