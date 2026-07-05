'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeLinesProps {
	className?: string;
}

const SCENE_SIZE = 500;
const MIN_DISTANCE = 90;
const MIN_DISTANCE_SQ = MIN_DISTANCE * MIN_DISTANCE;
const CELL_SIZE = MIN_DISTANCE;
const GRID_SIZE = Math.ceil(SCENE_SIZE / CELL_SIZE);
const CELL_COUNT = GRID_SIZE * GRID_SIZE * GRID_SIZE;

const getParticleCount = (width: number, height: number) => {
	const size = Math.min(width, height);

	if (size < 480) return 160;
	if (size < 680) return 240;
	return 340;
};

export default function ThreeLines({ className }: ThreeLinesProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const width = container.clientWidth || 400;
		const height = container.clientHeight || 400;
		let isVisible = true;
		const particleCount = getParticleCount(width, height);
		const maxLineSegments = particleCount * 48;
		const rHalf = SCENE_SIZE / 2;

		const camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
		camera.position.z = 1100;

		const scene = new THREE.Scene();

		const group = new THREE.Group();
		scene.add(group);

		const helperMesh = new THREE.Mesh(
			new THREE.BoxGeometry(SCENE_SIZE, SCENE_SIZE, SCENE_SIZE),
		);
		const helper = new THREE.BoxHelper(helperMesh);
		const helperMaterial = helper.material as THREE.LineBasicMaterial;
		helperMaterial.color.setHex(0x474747);
		helperMaterial.blending = THREE.AdditiveBlending;
		helperMaterial.transparent = true;
		helperMaterial.opacity = 0.5;
		group.add(helper);

		const particlePositions = new Float32Array(particleCount * 3);
		const velocities = new Float32Array(particleCount * 3);
		const cellHeads = new Int32Array(CELL_COUNT);
		const particleNext = new Int32Array(particleCount);

		for (let i = 0; i < particleCount; i++) {
			const x = Math.random() * SCENE_SIZE - rHalf;
			const y = Math.random() * SCENE_SIZE - rHalf;
			const z = Math.random() * SCENE_SIZE - rHalf;
			const index = i * 3;

			particlePositions[index] = x;
			particlePositions[index + 1] = y;
			particlePositions[index + 2] = z;

			velocities[index] = -0.65 + Math.random() * 1.3;
			velocities[index + 1] = -0.65 + Math.random() * 1.3;
			velocities[index + 2] = -0.65 + Math.random() * 1.3;
		}

		const particles = new THREE.BufferGeometry();
		particles.setDrawRange(0, particleCount);
		particles.setAttribute(
			'position',
			new THREE.BufferAttribute(particlePositions, 3).setUsage(
				THREE.DynamicDrawUsage,
			),
		);

		const pMaterial = new THREE.PointsMaterial({
			color: 0xffffff,
			size: 3,
			blending: THREE.AdditiveBlending,
			transparent: true,
			sizeAttenuation: false,
		});

		const pointCloud = new THREE.Points(particles, pMaterial);
		group.add(pointCloud);

		const positions = new Float32Array(maxLineSegments * 2 * 3);
		const colors = new Float32Array(maxLineSegments * 2 * 3);

		const linesGeometry = new THREE.BufferGeometry();
		linesGeometry.setAttribute(
			'position',
			new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
		);
		linesGeometry.setAttribute(
			'color',
			new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage),
		);
		linesGeometry.computeBoundingSphere();
		linesGeometry.setDrawRange(0, 0);

		const linesMaterial = new THREE.LineBasicMaterial({
			vertexColors: true,
			blending: THREE.AdditiveBlending,
			transparent: true,
			opacity: 0.6,
		});

		const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
		group.add(linesMesh);
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: false,
			powerPreference: 'high-performance',
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.setSize(width, height);
		container.appendChild(renderer.domElement);

		const getCellIndex = (x: number, y: number, z: number) => {
			const cx = Math.min(
				GRID_SIZE - 1,
				Math.max(0, Math.floor((x + rHalf) / CELL_SIZE)),
			);
			const cy = Math.min(
				GRID_SIZE - 1,
				Math.max(0, Math.floor((y + rHalf) / CELL_SIZE)),
			);
			const cz = Math.min(
				GRID_SIZE - 1,
				Math.max(0, Math.floor((z + rHalf) / CELL_SIZE)),
			);

			return cx + cy * GRID_SIZE + cz * GRID_SIZE * GRID_SIZE;
		};

		let animationFrameId: number;
		let lastFrameTime = 0;
		const frameInterval = particleCount > 240 ? 1000 / 45 : 1000 / 60;

		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);
			if (!isVisible) return;

			const now = performance.now();
			if (now - lastFrameTime < frameInterval) return;
			lastFrameTime = now;

			let vertexpos = 0;
			let colorpos = 0;
			let numConnected = 0;
			cellHeads.fill(-1);

			for (let i = 0; i < particleCount; i++) {
				const index = i * 3;
				let x = particlePositions[index] + velocities[index];
				let y = particlePositions[index + 1] + velocities[index + 1];
				let z = particlePositions[index + 2] + velocities[index + 2];

				if (y < -rHalf || y > rHalf) {
					velocities[index + 1] = -velocities[index + 1];
					y = THREE.MathUtils.clamp(y, -rHalf, rHalf);
				}
				if (x < -rHalf || x > rHalf) {
					velocities[index] = -velocities[index];
					x = THREE.MathUtils.clamp(x, -rHalf, rHalf);
				}
				if (z < -rHalf || z > rHalf) {
					velocities[index + 2] = -velocities[index + 2];
					z = THREE.MathUtils.clamp(z, -rHalf, rHalf);
				}

				particlePositions[index] = x;
				particlePositions[index + 1] = y;
				particlePositions[index + 2] = z;

				const cellIndex = getCellIndex(x, y, z);
				particleNext[i] = cellHeads[cellIndex];
				cellHeads[cellIndex] = i;
			}

			for (let cz = 0; cz < GRID_SIZE; cz++) {
				for (let cy = 0; cy < GRID_SIZE; cy++) {
					for (let cx = 0; cx < GRID_SIZE; cx++) {
						const cellIndex = cx + cy * GRID_SIZE + cz * GRID_SIZE * GRID_SIZE;

						for (let i = cellHeads[cellIndex]; i !== -1; i = particleNext[i]) {
							const ia = i * 3;

							for (
								let nz = Math.max(0, cz - 1);
								nz <= Math.min(GRID_SIZE - 1, cz + 1);
								nz++
							) {
								for (
									let ny = Math.max(0, cy - 1);
									ny <= Math.min(GRID_SIZE - 1, cy + 1);
									ny++
								) {
									for (
										let nx = Math.max(0, cx - 1);
										nx <= Math.min(GRID_SIZE - 1, cx + 1);
										nx++
									) {
										const neighborCell =
											nx + ny * GRID_SIZE + nz * GRID_SIZE * GRID_SIZE;

										for (
											let j = cellHeads[neighborCell];
											j !== -1;
											j = particleNext[j]
										) {
											if (j <= i || numConnected >= maxLineSegments) continue;

											const ib = j * 3;
											const dx = particlePositions[ia] - particlePositions[ib];
											const dy =
												particlePositions[ia + 1] - particlePositions[ib + 1];
											const dz =
												particlePositions[ia + 2] - particlePositions[ib + 2];
											const distSq = dx * dx + dy * dy + dz * dz;

											if (distSq >= MIN_DISTANCE_SQ) continue;

											const alpha = 1 - Math.sqrt(distSq) / MIN_DISTANCE;

											positions[vertexpos++] = particlePositions[ia];
											positions[vertexpos++] = particlePositions[ia + 1];
											positions[vertexpos++] = particlePositions[ia + 2];
											positions[vertexpos++] = particlePositions[ib];
											positions[vertexpos++] = particlePositions[ib + 1];
											positions[vertexpos++] = particlePositions[ib + 2];

											colors[colorpos++] = alpha;
											colors[colorpos++] = alpha;
											colors[colorpos++] = alpha;
											colors[colorpos++] = alpha;
											colors[colorpos++] = alpha;
											colors[colorpos++] = alpha;
											numConnected++;
										}
									}
								}
							}
						}
					}
				}
			}

			linesMesh.geometry.setDrawRange(0, numConnected * 2);
			linesMesh.geometry.attributes.position.needsUpdate = true;
			linesMesh.geometry.attributes.color.needsUpdate = true;

			pointCloud.geometry.attributes.position.needsUpdate = true;
			const time = Date.now() * 0.0002;
			group.rotation.y = time;

			renderer.render(scene, camera);
		};

		animate();

		const visibilityObserver = new IntersectionObserver(([entry]) => {
			isVisible =
				entry.isIntersecting && document.visibilityState === 'visible';
		});
		visibilityObserver.observe(container);

		const handleVisibilityChange = () => {
			isVisible =
				document.visibilityState === 'visible' &&
				(container.offsetWidth > 0 || container.offsetHeight > 0);
		};
		document.addEventListener('visibilitychange', handleVisibilityChange);

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width: newWidth, height: newHeight } = entry.contentRect;
				if (newWidth > 0 && newHeight > 0) {
					camera.aspect = newWidth / newHeight;
					camera.updateProjectionMatrix();
					renderer.setSize(newWidth, newHeight);
				}
			}
		});
		resizeObserver.observe(container);
		return () => {
			cancelAnimationFrame(animationFrameId);
			resizeObserver.disconnect();
			visibilityObserver.disconnect();
			document.removeEventListener('visibilitychange', handleVisibilityChange);
			if (container.contains(renderer.domElement)) {
				container.removeChild(renderer.domElement);
			}
			helperMesh.geometry.dispose();
			helper.dispose();
			particles.dispose();
			pMaterial.dispose();
			linesGeometry.dispose();
			linesMaterial.dispose();
			renderer.dispose();
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className={className}
			style={{
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				position: 'relative',
			}}
		/>
	);
}
