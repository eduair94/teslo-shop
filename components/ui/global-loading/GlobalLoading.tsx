import { useUIStore } from '@/store';
import { Spinner } from '../spinner/Spinner';

export const GlobalLoading = () => {
  const isLoading = useUIStore((state) => state.isLoading);
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center backdrop-filter backdrop-blur-sm z-11">
          <Spinner size="50px" />
        </div>
      )}
    </>
  );
};
