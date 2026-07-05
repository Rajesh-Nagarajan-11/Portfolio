'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ThreeLinesProps {
	className?: string;
}

export default function ThreeLines({ className }: ThreeLinesProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let width = container.clientWidth || 400;
		let height = container.clientHeight || 400;

		const camera = new THREE.PerspectiveCamera(45, width / height, 1, 4000);
		camera.position.z = 1100;

		const scene = new THREE.Scene();

		const group = new THREE.Group();
		scene.add(group);

		const controls = new OrbitControls(camera, container);
		controls.minDistance = 600;
		controls.maxDistance = 2000;
		controls.enableDamping = true;
		controls.dampingFactor = 0.05;

		const maxParticleCount = 1000;
		const particleCount = 500;
		const r = 450;
		const rHalf = r / 2;
		const minDistance = 90;
		const minDistanceSq = minDistance * minDistance;

		const helperMesh = new THREE.Mesh(new THREE.BoxGeometry(r, r, r));
		const helper = new THREE.BoxHelper(helperMesh);
		const helperMaterial = helper.material as THREE.LineBasicMaterial;
		helperMaterial.color.setHex(0x474747);
		helperMaterial.blending = THREE.AdditiveBlending;
		helperMaterial.transparent = true;
		helperMaterial.opacity = 0.5;
		group.add(helper);

		const particlesData: { velocity: THREE.Vector3; numConnections: number }[] = [];
		const particlePositions = new Float32Array(maxParticleCount * 3);

		for (let i = 0; i < maxParticleCount; i++) {
			const x = Math.random() * r - rHalf;
			const y = Math.random() * r - rHalf;
			const z = Math.random() * r - rHalf;

			particlePositions[i * 3] = x;
			particlePositions[i * 3 + 1] = y;
			particlePositions[i * 3 + 2] = z;

			particlesData.push({
				velocity: new THREE.Vector3(
					-1 + Math.random() * 2,
					-1 + Math.random() * 2,
					-1 + Math.random() * 2,
				),
				numConnections: 0,
			});
		}

		const particles = new THREE.BufferGeometry();
		particles.setDrawRange(0, particleCount);
		particles.setAttribute(
			'position',
			new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage),
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

		const segments = maxParticleCount * maxParticleCount;
		const positions = new Float32Array(segments * 3);
		const colors = new Float32Array(segments * 3);

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
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		container.appendChild(renderer.domElement);
		let animationFrameId: number;
		const animate = () => {
			animationFrameId = requestAnimationFrame(animate);

			let vertexpos = 0;
			let colorpos = 0;
			let numConnected = 0;
			for (let i = 0; i < particleCount; i++) {
				particlesData[i].numConnections = 0;
			}

			for (let i = 0; i < particleCount; i++) {
				const pData = particlesData[i];

				particlePositions[i * 3] += pData.velocity.x;
				particlePositions[i * 3 + 1] += pData.velocity.y;
				particlePositions[i * 3 + 2] += pData.velocity.z;

				if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf) {
					pData.velocity.y = -pData.velocity.y;
				}
				if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf) {
					pData.velocity.x = -pData.velocity.x;
				}
				if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf) {
					pData.velocity.z = -pData.velocity.z;
				}
				for (let j = i + 1; j < particleCount; j++) {
					const dx = particlePositions[i * 3] - particlePositions[j * 3];
					const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
					const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
					const distSq = dx * dx + dy * dy + dz * dz;

					if (distSq < minDistanceSq) {
						pData.numConnections++;
						particlesData[j].numConnections++;

						const dist = Math.sqrt(distSq);
						const alpha = 1.0 - dist / minDistance;
						positions[vertexpos++] = particlePositions[i * 3];
						positions[vertexpos++] = particlePositions[i * 3 + 1];
						positions[vertexpos++] = particlePositions[i * 3 + 2];

						positions[vertexpos++] = particlePositions[j * 3];
						positions[vertexpos++] = particlePositions[j * 3 + 1];
						positions[vertexpos++] = particlePositions[j * 3 + 2];

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

			linesMesh.geometry.setDrawRange(0, numConnected * 2);
			linesMesh.geometry.attributes.position.needsUpdate = true;
			linesMesh.geometry.attributes.color.needsUpdate = true;

			pointCloud.geometry.attributes.position.needsUpdate = true;
			const time = Date.now() * 0.0002;
			group.rotation.y = time;

			controls.update();
			renderer.render(scene, camera);
		};

		animate();


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
			controls.dispose();
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
			style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}
		/>
	);
}
