'use client';

import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Registers a GSAP ScrollTrigger that reveals elements matching `selector`
 * inside `containerRef` when the container enters the viewport.
 *
 * Animations are minimal and clean:
 *   - fade in  (opacity 0 → 1)
 *   - rise up  (y 40 → 0)
 *   - optional blur clear (filter blur 8px → 0)
 *
 * Each matching element staggers by `stagger` seconds.
 * Returns a ref you attach to the outer section/container element.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>(
  selector: string,
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    blur?: boolean;
    start?: string;
    once?: boolean;
  } = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const container = ref.current;
      if (!container) return;

      const {
        stagger = 0.12,
        duration = 0.9,
        y = 40,
        blur = false,
        start = 'top 88%',
        once = true,
      } = options;

      const targets = container.querySelectorAll<HTMLElement>(selector);
      if (!targets.length) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          targets,
          {
            opacity: 0,
            y,
            ...(blur ? { filter: 'blur(8px)' } : {}),
          },
          {
            opacity: 1,
            y: 0,
            ...(blur ? { filter: 'blur(0px)' } : {}),
            duration,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: container,
              start,
              toggleActions: once
                ? 'play none none none'
                : 'play none none reverse',
            },
          }
        );
      }, container);
    })();

    return () => {
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
