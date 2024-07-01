import { useEffect, useState } from 'react';

import { IGetRoomId } from '@/app/_types/message';
import { getRoomId } from '@/app/_api/messages/getRoomId';

const useRoomId = ({ senderId, receiverId }: IGetRoomId) => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        if (senderId && receiverId) {
          const fetchedRoomId = await getRoomId({ senderId, receiverId });
          setRoomId(fetchedRoomId);
        }
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchRoomId();
  }, [senderId, receiverId]);

  return { roomId, loading, error };
};

export default useRoomId;
