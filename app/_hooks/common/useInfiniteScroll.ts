import { useCallback, useEffect } from 'react';
import { throttle } from 'lodash';
import { useInView } from 'react-intersection-observer';

interface IUseInfiniteScroll {
  fetchNextPage: () => void;
  isFetching: boolean;
  hasNextPage: boolean;
}

const useInfiniteScroll = ({ fetchNextPage, isFetching, hasNextPage }: IUseInfiniteScroll) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledFetchNextPage = useCallback(throttle(fetchNextPage, 500), [fetchNextPage]);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      throttledFetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return { ref };
};

export default useInfiniteScroll;
