'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

type Axis = 'x' | 'y' | 'z';

interface GridPosition {
  x: number;
  y: number;
  z: number;
}

interface LayerMove {
  axis: Axis;
  layer: number;
  direction: 1 | -1;
}

interface ActiveMove extends LayerMove {
  pivot: THREE.Group;
  cubies: THREE.Mesh[];
  elapsed: number;
  duration: number;
}

const CUBE_SIZE = 0.92;
const CUBE_SPACING = 1.06;
const TURN_DURATION = 420;
const AUTO_SHUFFLE_INTERVAL = 3200;
const FACE_COLORS = {
  right: 0xd92d20,
  left: 0xf97316,
  top: 0xf8fafc,
  bottom: 0xfacc15,
  front: 0x16a34a,
  back: 0x2563eb,
  inner: 0x111827,
};

function easeInOutCubic(value: number): number {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function createMaterial(color: number, roughness = 0.48): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.05,
  });
}

function createCubieMaterials(position: GridPosition): THREE.MeshStandardMaterial[] {
  return [
    createMaterial(position.x === 1 ? FACE_COLORS.right : FACE_COLORS.inner),
    createMaterial(position.x === -1 ? FACE_COLORS.left : FACE_COLORS.inner),
    createMaterial(position.y === 1 ? FACE_COLORS.top : FACE_COLORS.inner, 0.34),
    createMaterial(position.y === -1 ? FACE_COLORS.bottom : FACE_COLORS.inner),
    createMaterial(position.z === 1 ? FACE_COLORS.front : FACE_COLORS.inner),
    createMaterial(position.z === -1 ? FACE_COLORS.back : FACE_COLORS.inner),
  ];
}

function getLayerCubies(cubies: THREE.Mesh[], move: LayerMove): THREE.Mesh[] {
  return cubies.filter((cubie) => {
    const grid = cubie.userData.grid as GridPosition;
    return grid[move.axis] === move.layer;
  });
}

function updateGridPosition(position: GridPosition, axis: Axis, direction: 1 | -1): GridPosition {
  const { x, y, z } = position;

  if (axis === 'x') {
    return direction === 1
      ? { x, y: -z, z: y }
      : { x, y: z, z: -y };
  }

  if (axis === 'y') {
    return direction === 1
      ? { x: z, y, z: -x }
      : { x: -z, y, z: x };
  }

  return direction === 1
    ? { x: -y, y: x, z }
    : { x: y, y: -x, z };
}

function randomMove(): LayerMove {
  const axes: Axis[] = ['x', 'y', 'z'];
  return {
    axis: axes[Math.floor(Math.random() * axes.length)],
    layer: Math.floor(Math.random() * 3) - 1,
    direction: Math.random() > 0.5 ? 1 : -1,
  };
}

export function HeroImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shuffleRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const cubeRoot = new THREE.Group();
    cubeRoot.rotation.set(-0.42, -0.62, 0.12);
    scene.add(cubeRoot);

    const cubieGeometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    const edgeGeometry = new THREE.EdgesGeometry(cubieGeometry);
    const cubies: THREE.Mesh[] = [];
    for (let x = -1; x <= 1; x += 1) {
      for (let y = -1; y <= 1; y += 1) {
        for (let z = -1; z <= 1; z += 1) {
          const grid = { x, y, z };
          const cubie = new THREE.Mesh(cubieGeometry, createCubieMaterials(grid));
          cubie.position.set(x * CUBE_SPACING, y * CUBE_SPACING, z * CUBE_SPACING);
          cubie.userData.grid = grid;

          const edges = new THREE.LineSegments(
            edgeGeometry,
            new THREE.LineBasicMaterial({ color: 0x020617, transparent: true, opacity: 0.85 })
          );
          cubie.add(edges);

          cubies.push(cubie);
          cubeRoot.add(cubie);
        }
      }
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1.65));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.25);
    rimLight.position.set(-5, -2, 4);
    scene.add(rimLight);

    camera.position.set(0, 0, 8.4);

    let frameId = 0;
    let activeMove: ActiveMove | null = null;
    let previousTime = performance.now();
    let disposed = false;
    let pointerDown = false;
    let pointerMoved = false;
    let lastPointer = { x: 0, y: 0 };
    const moveQueue: LayerMove[] = [];
    const targetRotation = new THREE.Euler(cubeRoot.rotation.x, cubeRoot.rotation.y, cubeRoot.rotation.z);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const queueShuffle = (turns = 7) => {
      for (let i = 0; i < turns; i += 1) {
        moveQueue.push(randomMove());
      }
      container.dataset.shuffleState = 'queued';
    };

    const startMove = (move: LayerMove) => {
      const pivot = new THREE.Group();
      cubeRoot.add(pivot);
      const layerCubies = getLayerCubies(cubies, move);
      layerCubies.forEach((cubie) => pivot.attach(cubie));

      activeMove = {
        ...move,
        pivot,
        cubies: layerCubies,
        elapsed: 0,
        duration: TURN_DURATION,
      };
      container.dataset.shuffleState = 'turning';
    };

    const finishMove = (move: ActiveMove) => {
      move.pivot.rotation[move.axis] = move.direction * Math.PI * 0.5;
      move.pivot.updateMatrixWorld(true);

      move.cubies.forEach((cubie) => {
        cubeRoot.attach(cubie);
        cubie.userData.grid = updateGridPosition(
          cubie.userData.grid as GridPosition,
          move.axis,
          move.direction
        );
      });

      cubeRoot.remove(move.pivot);
      activeMove = null;
      container.dataset.shuffleState = moveQueue.length > 0 ? 'queued' : 'idle';
    };

    const animate = (time: number) => {
      const delta = Math.min(time - previousTime, 48);
      previousTime = time;

      if (!pointerDown) {
        targetRotation.y += delta * 0.00017;
        targetRotation.x = THREE.MathUtils.lerp(targetRotation.x, -0.42, 0.012);
      }

      cubeRoot.rotation.x = THREE.MathUtils.lerp(cubeRoot.rotation.x, targetRotation.x, 0.08);
      cubeRoot.rotation.y = THREE.MathUtils.lerp(cubeRoot.rotation.y, targetRotation.y, 0.08);
      cubeRoot.rotation.z = THREE.MathUtils.lerp(cubeRoot.rotation.z, 0.12, 0.04);

      if (!activeMove && moveQueue.length > 0) {
        const nextMove = moveQueue.shift();
        if (nextMove) startMove(nextMove);
      }

      if (activeMove) {
        activeMove.elapsed += delta;
        const progress = Math.min(activeMove.elapsed / activeMove.duration, 1);
        activeMove.pivot.rotation[activeMove.axis] =
          activeMove.direction * Math.PI * 0.5 * easeInOutCubic(progress);

        if (progress === 1) {
          finishMove(activeMove);
        }
      }

      renderer.render(scene, camera);
      if (!disposed) frameId = requestAnimationFrame(animate);
    };

    const onPointerDown = (event: PointerEvent) => {
      pointerDown = true;
      pointerMoved = false;
      lastPointer = { x: event.clientX, y: event.clientY };
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerDown) return;

      const dx = event.clientX - lastPointer.x;
      const dy = event.clientY - lastPointer.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) pointerMoved = true;

      targetRotation.y += dx * 0.009;
      targetRotation.x += dy * 0.006;
      targetRotation.x = THREE.MathUtils.clamp(targetRotation.x, -1.1, 0.65);
      lastPointer = { x: event.clientX, y: event.clientY };
    };

    const onPointerUp = (event: PointerEvent) => {
      pointerDown = false;
      renderer.domElement.releasePointerCapture(event.pointerId);
      if (!pointerMoved) queueShuffle(8);
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);

    const shuffleTimer = window.setInterval(() => {
      if (!pointerDown && moveQueue.length < 2) queueShuffle(1);
    }, AUTO_SHUFFLE_INTERVAL);

    container.dataset.shuffleState = 'idle';
    shuffleRef.current = () => queueShuffle(8);
    frameId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      shuffleRef.current = null;
      window.clearInterval(shuffleTimer);
      cancelAnimationFrame(frameId);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);

      cubieGeometry.dispose();
      edgeGeometry.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
        if (object instanceof THREE.LineSegments) {
          object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="relative h-72 w-72 cursor-grab select-none touch-none md:h-80 md:w-80 lg:h-[26rem] lg:w-[26rem] active:cursor-grabbing"
      role="button"
      tabIndex={0}
      aria-label="Shuffle rotating Rubik cube"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          shuffleRef.current?.();
        }
      }}
    >
      <div
        ref={containerRef}
        data-hero-rubik
        className="absolute inset-0"
      />
    </motion.div>
  );
}
