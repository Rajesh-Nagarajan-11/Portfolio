'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type GalaxyBackgroundProps = {
	/** Ref to the tall "pin" wrapper that defines the scroll-driven zoom range */
	pinRef?: React.RefObject<HTMLDivElement>;
	/** Ref to a full-bleed div used as the black fade-to-next-section overlay */
	fadeRef?: React.RefObject<HTMLDivElement>;
};

export default function GalaxyBackground({ pinRef, fadeRef }: GalaxyBackgroundProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	// Mutable, not React state — avoids re-renders on every scroll tick
	const scrollProgress = useRef(0);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let width = container.clientWidth || window.innerWidth;
		let height = container.clientHeight || window.innerHeight;

		// Scene & Camera
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
		camera.position.set(0, 4, 6);

		// Renderer
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		container.appendChild(renderer.domElement);

		// Galaxy Parameters
		const parameters = {
			count: 120000,
			size: 0.015,
			radius: 8,
			branches: 3,
			spin: 1,
			randomness: 0.3,
			power: 4,
			insideColor: '#00ff88',
			outsideColor: '#022c22',
		};

		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(parameters.count * 3);
		const colors = new Float32Array(parameters.count * 3);
		const randomness = new Float32Array(parameters.count * 3);
		const scales = new Float32Array(parameters.count);

		const colorInside = new THREE.Color(parameters.insideColor);
		const colorOutside = new THREE.Color(parameters.outsideColor);

		for (let i = 0; i < parameters.count; i++) {
			const i3 = i * 3;
			const radius = Math.random() * parameters.radius;
			const spinAngle = radius * parameters.spin;
			const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

			const randomX = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
			const randomY = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
			const randomZ = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

			positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
			positions[i3 + 1] = 0;
			positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

			randomness[i3] = randomX;
			randomness[i3 + 1] = randomY;
			randomness[i3 + 2] = randomZ;

			const mixedColor = colorInside.clone();
			mixedColor.lerp(colorOutside, radius / parameters.radius);

			colors[i3] = mixedColor.r;
			colors[i3 + 1] = mixedColor.g;
			colors[i3 + 2] = mixedColor.b;

			scales[i] = Math.random();
		}

		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));
		geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

		const vertexShader = `
			uniform float uTime;
			uniform float uSize;
			attribute vec3 aRandomness;
			attribute float aScale;
			varying vec3 vColor;

			void main() {
				vec4 modelPosition = modelMatrix * vec4(position, 1.0);

				float angle = uTime * 0.15;
				float distanceToCenter = length(modelPosition.xz);
				float angleOffset = (1.0 / distanceToCenter) * 0.5;
				float finalAngle = angle + angleOffset;

				float cosAngle = cos(finalAngle);
				float sinAngle = sin(finalAngle);

				vec2 rotatedPosition = vec2(
					modelPosition.x * cosAngle - modelPosition.z * sinAngle,
					modelPosition.x * sinAngle + modelPosition.z * cosAngle
				);

				modelPosition.x = rotatedPosition.x;
				modelPosition.z = rotatedPosition.y;

				modelPosition.xyz += aRandomness;

				vec4 viewPosition = viewMatrix * modelPosition;
				vec4 projectedPosition = projectionMatrix * viewPosition;

				gl_Position = projectedPosition;

				gl_PointSize = uSize * aScale * (300.0 / -viewPosition.z);
				vColor = color;
			}
		`;

		const fragmentShader = `
			varying vec3 vColor;

			void main() {
				float strength = distance(gl_PointCoord, vec2(0.5));
				strength = 1.0 - strength;
				strength = pow(strength, 6.0);

				vec3 finalColor = mix(vec3(0.0), vColor, strength);
				gl_FragColor = vec4(finalColor, strength);
			}
		`;

		const material = new THREE.ShaderMaterial({
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			vertexColors: true,
			transparent: true,
			uniforms: {
				uTime: { value: 0 },
				uSize: { value: parameters.size * (renderer.getPixelRatio() || 1) * 20 },
			},
			vertexShader,
			fragmentShader,
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		// --- Mouse parallax (kept from original) ---
		const mouse = { x: 0, y: 0 };
		const targetCameraPosition = { x: 0, y: 4, z: 6 };

		const handleMouseMove = (event: MouseEvent) => {
			mouse.x = (event.clientX / window.innerWidth) - 0.5;
			mouse.y = (event.clientY / window.innerHeight) - 0.5;
		};
		window.addEventListener('mousemove', handleMouseMove);

		// --- Scroll-driven zoom-into-core setup ---
		const clampFn = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

		const handleScroll = () => {
			const pinEl = pinRef?.current;
			if (!pinEl) return;

			const rect = pinEl.getBoundingClientRect();
			const scrollableRange = pinEl.offsetHeight - window.innerHeight;
			let progress = scrollableRange > 0 ? -rect.top / scrollableRange : 0;
			progress = clampFn(progress, 0, 1);
			scrollProgress.current = progress;

			// Drive the black fade overlay directly (no React re-render needed)
			if (fadeRef?.current) {
				const fadeStart = 0.65;
				let fade = (progress - fadeStart) / (1 - fadeStart);
				fade = clampFn(fade, 0, 1);
				fadeRef.current.style.opacity = String(fade);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleScroll);
		handleScroll();

		// Animation Loop
		const clock = new THREE.Clock();
		let animId: number;

		// Base (mouse-parallax) camera position vs. zoom target — blended each frame
		const baseZ = 6;
		const zoomZ = 0.9; // how close the camera dollies in toward the core
		const baseY = 4;
		const zoomY = 0.6;

		const tick = () => {
			animId = requestAnimationFrame(tick);

			const elapsedTime = clock.getElapsedTime();
			material.uniforms.uTime.value = elapsedTime;

			const progress = scrollProgress.current;

			// Mouse parallax target (as before)
			targetCameraPosition.x = mouse.x * 3;
			targetCameraPosition.y = baseY + mouse.y * 2;
			targetCameraPosition.z = baseZ;

			// Ease the zoom with a smoothstep-ish curve for a more cinematic feel
			const eased = progress * progress * (3 - 2 * progress);
			const zoomedZ = THREE.MathUtils.lerp(baseZ, zoomZ, eased);
			const zoomedY = THREE.MathUtils.lerp(targetCameraPosition.y, zoomY, eased);

			camera.position.x += (targetCameraPosition.x - camera.position.x) * 0.05;
			camera.position.y += (zoomedY - camera.position.y) * 0.05;
			camera.position.z += (zoomedZ - camera.position.z) * 0.05;
			camera.lookAt(new THREE.Vector3(0, 0, 0));

			// Speed up the spin slightly as we dive in, for extra "falling into it" feel
			material.uniforms.uTime.value = elapsedTime * (1 + eased * 0.8);

			renderer.render(scene, camera);
		};
		tick();

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width: w, height: h } = entry.contentRect;
				if (w > 0 && h > 0) {
					camera.aspect = w / h;
					camera.updateProjectionMatrix();
					renderer.setSize(w, h);
				}
			}
		});
		resizeObserver.observe(container);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
			resizeObserver.disconnect();
			if (container.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
			geometry.dispose();
			material.dispose();
			renderer.dispose();
		};
	}, [pinRef, fadeRef]);

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 z-0 pointer-events-none"
			style={{ width: '100%', height: '100%' }}
		/>
	);
}
