import { useState, useEffect, useRef } from "react";

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  life: number;
}

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
    selector: string,
    staggerDelay: number = 100,
  ) => {
    setTimeout(() => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
        setTimeout(() => {
          createParticlesFromElement(
            element as HTMLElement,
            `disintegrating-${Date.now()}-${index}`,
          );
        }, index * staggerDelay);
      });
    }, 100);
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
  };
}

export function ParticleRenderer({ particles }: { particles: Particle[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="animate-particle absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
    </div>
  );
}

export const particleStyles = `
  @keyframes particle {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
    }
  }

  @keyframes disintegrate {
    0% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0px);
    }
    30% {
      opacity: 0.8;
      transform: scale(1.02);
      filter: blur(0px);
    }
    60% {
      opacity: 0.4;
      transform: scale(0.98);
      filter: blur(1px);
    }
    80% {
      opacity: 0.2;
      transform: scale(0.95);
      filter: blur(2px);
    }
    100% {
      opacity: 0;
      transform: scale(0.9);
      filter: blur(3px);
    }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-1px); }
    20%, 40%, 60%, 80% { transform: translateX(1px); }
  }

  .animate-particle {
    animation: particle 2s ease-out forwards;
    box-shadow: 0 0 4px currentColor;
  }

  .animate-disintegrate {
    animation: disintegrate 0.8s ease-out forwards, shake 0.3s ease-in-out;
  }
`;
