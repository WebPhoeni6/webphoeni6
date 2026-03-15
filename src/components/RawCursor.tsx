import { useEffect, useRef } from 'react';
import './RawCursor.css';

export default function RawCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let r1x = mx, r1y = my;
    let r2x = mx, r2y = my;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // dot snaps
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      // ring1 lerps at 0.18
      r1x = lerp(r1x, mx, 0.18);
      r1y = lerp(r1y, my, 0.18);
      if (ring1Ref.current) {
        ring1Ref.current.style.transform = `translate(${r1x - 16}px, ${r1y - 16}px)`;
      }
      // ring2 lerps at 0.1
      r2x = lerp(r2x, mx, 0.1);
      r2y = lerp(r2y, my, 0.1);
      if (ring2Ref.current) {
        ring2Ref.current.style.transform = `translate(${r2x - 28}px, ${r2y - 28}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="rc-dot" />
      <div ref={ring1Ref} className="rc-ring rc-ring--1" />
      <div ref={ring2Ref} className="rc-ring rc-ring--2" />
    </>
  );
}
