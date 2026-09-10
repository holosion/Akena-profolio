import type { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

/** Slot for a future React Bits / R3F hero scene. Pass <Hero3D /> content later. */
export default function Hero3D({ children }: Props) {
  if (!children) return null;
  return <div className="hero-3d-slot">{children}</div>;
}
