import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export default function VisibilityMount({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShow(true);
      },
      { rootMargin: '120px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
