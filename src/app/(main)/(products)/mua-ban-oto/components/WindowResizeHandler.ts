// components/WindowResizeHandler.tsx
import { useEffect } from 'react';

interface WindowResizeHandlerProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
  onResize: (height: number) => void;
}

const WindowResizeHandler: React.FC<WindowResizeHandlerProps> = ({ targetRef, onResize }) => {
  useEffect(() => {
    const handleResize = () => {
      if (targetRef.current) {
        onResize(targetRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [targetRef, onResize]);

  return null;
};

export default WindowResizeHandler;
