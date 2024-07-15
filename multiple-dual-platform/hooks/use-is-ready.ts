import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useIsReady = () => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setIsReady(true);
    }
  }, [router.isReady]);

  return isReady;
};

export default useIsReady;
