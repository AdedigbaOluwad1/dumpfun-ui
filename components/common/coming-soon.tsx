'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Rocket, Code } from 'lucide-react';

interface ComingSoonProps {
	title: string;
	description: string;
	features?: string[];
	icon?: React.ReactNode;
}

export function ComingSoon({ title, description, icon }: ComingSoonProps) {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({
				x: (e.clientX / window.innerWidth) * 100,
				y: (e.clientY / window.innerHeight) * 100,
			});
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return (
		<div className='min-h-full flex-1 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden flex items-center justify-center'>
			<div className='absolute inset-0'>
				<div className='floating-cube cube-1'></div>
				<div className='floating-cube cube-2'></div>
				<div className='floating-cube cube-3'></div>
				<div className='floating-cube cube-4'></div>
				<div className='floating-cube cube-5'></div>

				<div className='particle-grid'>
					{Array.from({ length: 50 }).map((_, i) => (
						<div
							key={i}
							className='particle'
							style={{ animationDelay: `${i * 0.1}s` }}
						></div>
					))}
				</div>

				<div
					className='gradient-orb'
					style={{
						transform: `translate(${mousePosition.x * 0.1}px, ${
							mousePosition.y * 0.1
						}px)`,
					}}
				></div>

				<div className='rotating-ring ring-1'></div>
				<div className='rotating-ring ring-2'></div>
				<div className='rotating-ring ring-3'></div>
			</div>

			<div className='relative z-10 text-center max-w-4xl mx-auto px-6'>
				<div className='icon-container mb-8'>
					<div className='icon-3d'>
						{icon || <Code className='w-16 h-16 text-cyan-400' />}
					</div>
					<div className='icon-glow'></div>
				</div>

				<h1
					className='glitch-text text-4xl md:text-6xl lg:text-8xl font-bold mb-2 md:mb-6'
					data-text={title}
				>
					{title}
				</h1>

				<p className='text-base md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed'>
					{description}
				</p>

				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
					<Button
						variant='outline'
						className='btn-3d border-green-500 text-white hover:bg-green-500/70! h-10 md:h-12 rounded-lg w-50 py-4 text-sm md:text-base bg-green-500/70!'
					>
						<Rocket className='w-5 h-5 mr-2' />
						Back to Home
					</Button>
				</div>

				<div className='mt-12'>
					<div className='text-xs md:text-sm text-gray-400 mb-2'>
						Development Progress
					</div>
					<div className='progress-bar'>
						<div className='progress-fill'></div>
					</div>
					<div className='text-xs md:text-sm text-green-400 mt-2'>
						65% Complete
					</div>
				</div>
			</div>

			<style jsx>{`
				/* Floating Cubes */
				.floating-cube {
					position: absolute;
					width: 60px;
					height: 60px;
					background: linear-gradient(45deg, #10b981, #059669);
					border-radius: 8px;
					animation: float 6s ease-in-out infinite;
					opacity: 0.7;
					box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
				}

				.cube-1 {
					top: 10%;
					left: 10%;
					animation-delay: 0s;
					transform: rotateX(45deg) rotateY(45deg);
				}

				.cube-2 {
					top: 20%;
					right: 15%;
					animation-delay: 1s;
					transform: rotateX(-45deg) rotateY(45deg);
				}

				.cube-3 {
					bottom: 20%;
					left: 20%;
					animation-delay: 2s;
					transform: rotateX(45deg) rotateY(-45deg);
				}

				.cube-4 {
					bottom: 30%;
					right: 10%;
					animation-delay: 3s;
					transform: rotateX(-45deg) rotateY(-45deg);
				}

				.cube-5 {
					top: 50%;
					left: 5%;
					animation-delay: 4s;
					transform: rotateX(0deg) rotateY(90deg);
				}

				@keyframes float {
					0%,
					100% {
						transform: translateY(0px) rotateX(45deg) rotateY(45deg);
					}
					50% {
						transform: translateY(-20px) rotateX(45deg) rotateY(45deg);
					}
				}

				/* Particle Grid */
				.particle-grid {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					display: grid;
					grid-template-columns: repeat(10, 1fr);
					grid-template-rows: repeat(10, 1fr);
					gap: 20px;
					padding: 20px;
				}

				.particle {
					width: 4px;
					height: 4px;
					background: #10b981;
					border-radius: 50%;
					animation: pulse 2s ease-in-out infinite;
					opacity: 0.5;
				}

				@keyframes pulse {
					0%,
					100% {
						opacity: 0.2;
						transform: scale(1);
					}
					50% {
						opacity: 0.8;
						transform: scale(1.5);
					}
				}

				/* Gradient Orb */
				.gradient-orb {
					position: absolute;
					top: 20%;
					right: 20%;
					width: 300px;
					height: 300px;
					background: radial-gradient(
						circle,
						rgba(16, 185, 129, 0.3) 0%,
						rgba(5, 150, 105, 0.1) 70%
					);
					border-radius: 50%;
					filter: blur(40px);
					animation: breathe 4s ease-in-out infinite;
				}

				@keyframes breathe {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.2);
					}
				}

				/* Rotating Rings */
				.rotating-ring {
					position: absolute;
					border: 2px solid;
					border-radius: 50%;
					opacity: 0.3;
				}

				.ring-1 {
					width: 200px;
					height: 200px;
					top: 30%;
					left: 20%;
					border-color: #10b981;
					animation: rotate 10s linear infinite;
				}

				.ring-2 {
					width: 150px;
					height: 150px;
					bottom: 30%;
					right: 30%;
					border-color: #059669;
					animation: rotate 15s linear infinite reverse;
				}

				.ring-3 {
					width: 100px;
					height: 100px;
					top: 60%;
					left: 60%;
					border-color: #047857;
					animation: rotate 8s linear infinite;
				}

				@keyframes rotate {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(360deg);
					}
				}

				/* Icon 3D Effect */
				.icon-container {
					position: relative;
					display: inline-block;
				}

				.icon-3d {
					position: relative;
					z-index: 2;
					animation: iconFloat 3s ease-in-out infinite;
					filter: drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3));
				}

				.icon-glow {
					position: absolute;
					top: 50%;
					left: 50%;
					width: 120px;
					height: 120px;
					background: radial-gradient(
						circle,
						rgba(16, 185, 129, 0.4) 0%,
						transparent 70%
					);
					border-radius: 50%;
					transform: translate(-50%, -50%);
					animation: glow 2s ease-in-out infinite alternate;
				}

				@keyframes iconFloat {
					0%,
					100% {
						transform: translateY(0px) rotateY(0deg);
					}
					50% {
						transform: translateY(-10px) rotateY(180deg);
					}
				}

				@keyframes glow {
					from {
						opacity: 0.5;
						transform: translate(-50%, -50%) scale(1);
					}
					to {
						opacity: 0.8;
						transform: translate(-50%, -50%) scale(1.2);
					}
				}

				/* Glitch Text Effect */
				.glitch-text {
					position: relative;
					background: linear-gradient(45deg, #10b981, #059669, #047857);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					animation: textShine 3s ease-in-out infinite;
				}

				.glitch-text::before,
				.glitch-text::after {
					content: attr(data-text);
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: linear-gradient(45deg, #10b981, #059669);
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.glitch-text::before {
					animation: glitch1 2s infinite;
				}

				.glitch-text::after {
					animation: glitch2 2s infinite;
				}

				@keyframes textShine {
					0%,
					100% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
				}

				@keyframes glitch1 {
					0%,
					100% {
						transform: translate(0);
						opacity: 0;
					}
					20% {
						transform: translate(-2px, 2px);
						opacity: 0.1;
					}
				}

				@keyframes glitch2 {
					0%,
					100% {
						transform: translate(0);
						opacity: 0;
					}
					80% {
						transform: translate(2px, -2px);
						opacity: 0.1;
					}
				}

				/* Feature Cards */
				.feature-card {
					background: rgba(16, 185, 129, 0.1);
					border: 1px solid rgba(16, 185, 129, 0.3);
					border-radius: 12px;
					padding: 20px;
					text-align: center;
					animation: slideUp 0.6s ease-out forwards;
					opacity: 0;
					transform: translateY(30px);
					backdrop-filter: blur(10px);
					transition: all 0.3s ease;
				}

				.feature-card:hover {
					transform: translateY(-5px);
					border-color: rgba(16, 185, 129, 0.6);
					box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
				}

				@keyframes slideUp {
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				/* 3D Buttons */
				.btn-3d {
					position: relative;
					transform-style: preserve-3d;
					transition: all 0.3s ease;
				}

				.btn-3d:hover {
					transform: translateY(-3px) rotateX(10deg);
					box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
				}

				.btn-3d:active {
					transform: translateY(-1px) rotateX(5deg);
				}

				/* Pulse Glow Animation */
				@keyframes pulse-glow {
					0%,
					100% {
						box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
					}
					50% {
						box-shadow: 0 0 30px rgba(16, 185, 129, 0.8);
					}
				}

				.animate-pulse-glow {
					animation: pulse-glow 2s ease-in-out infinite;
				}

				/* Progress Bar */
				.progress-bar {
					width: 300px;
					height: 8px;
					background: rgba(16, 185, 129, 0.2);
					border-radius: 4px;
					margin: 0 auto;
					overflow: hidden;
				}

				.progress-fill {
					height: 100%;
					width: 65%;
					background: linear-gradient(90deg, #10b981, #059669);
					border-radius: 4px;
					animation: progressShine 2s ease-in-out infinite;
				}

				@keyframes progressShine {
					0%,
					100% {
						opacity: 0.8;
					}
					50% {
						opacity: 1;
						box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
					}
				}
			`}</style>
		</div>
	);
}
