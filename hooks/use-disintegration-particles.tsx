import { Particle } from "@/types";
import { useState, useEffect, useRef } from "react";

export function useDisintegrationParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create particles from an element
  const createParticlesFromElement = (
    element: HTMLElement,
    particleId: string,
  ) => {
    const rect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    const newParticles: Particle[] = [];
    const particleCount = 25 + Math.random() * 15; // 25-40 particles

    const colors = [
      "rgb(75, 85, 99)", // gray-600
      "rgb(107, 114, 128)", // gray-500
      "rgb(156, 163, 175)", // gray-400
      "rgb(34, 197, 94)", // green-500
      "rgb(59, 130, 246)", // blue-500
      "rgb(239, 68, 68)", // red-500
    ];

    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        id: `${particleId}-particle-${i}`,
        x: rect.left - containerRect.left + Math.random() * rect.width,
        y: rect.top - containerRect.top + Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 8, // Random horizontal velocity
        vy: (Math.random() - 0.5) * 8 - 2, // Random vertical velocity (slightly upward)
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        life: 1,
      };
      newParticles.push(particle);
    }

    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;

    const animateParticles = () => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98, // Friction
            vy: particle.vy * 0.98 + 0.1, // Gravity
            opacity: particle.opacity * 0.95,
            life: particle.life * 0.95,
            size: particle.size * 0.99,
          }))
          .filter((particle) => particle.life > 0.1 && particle.opacity > 0.05),
      );
    };

    const interval = setInterval(animateParticles, 16); // ~60fps
    return () => clearInterval(interval);
  }, [particles.length]);

  const disintegrateElements = (
    element: HTMLElement,
    staggerDelay: number = 100,
  ) => {
    setTimeout(() => {
      setTimeout(() => {
        createParticlesFromElement(
          element as HTMLElement,
          Math.random().toLocaleString(),
        );
      }, 1 * staggerDelay);
    }, 100);
  };

  const onElementDisintegrate = (
    element: HTMLElement,
    callback?: () => void,
  ) => {
    // Mark elements for disintegration (add data attribute)
    // elementsToDisintegrate.forEach((el) => {
    // });
    element.setAttribute("data-disintegrating", "true");
    element.classList.add("animate-disintegrate");

    disintegrateElements(element, 100);

    setTimeout(() => {
      callback?.();
      // element.remove();
    }, 800);
  };

  const clearParticles = () => {
    setParticles([]);
  };

  return {
    particles,
    containerRef,
    createParticlesFromElement,
    disintegrateElements,
    clearParticles,
    onElementDisintegrate,
  };
}
