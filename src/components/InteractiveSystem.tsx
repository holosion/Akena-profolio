import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

/** Slot for a future interactive 3D system diagram. */
export default function InteractiveSystem({ children }: Props) {
  if (!children) return null;
  return <div className="interactive-system-slot">{children}</div>;
}
