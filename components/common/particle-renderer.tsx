import { Particle } from "@/types";

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
