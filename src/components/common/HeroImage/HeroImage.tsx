'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Cube from 'cubejs';

type Axis = 'x' | 'y' | 'z';
type Face = 'U' | 'R' | 'F' | 'D' | 'L' | 'B';
type FaceTurn = Face | `${Face}'`;
type SolverTurn = FaceTurn | `${Face}2`;

interface CubeState {
  center: number[];
  cp: number[];
  co: number[];
  ep: number[];
  eo: number[];
}

type SolverMessage =
  | { type: 'ready' }
  | { type: 'solution'; id: number; algorithm: string }
  | { type: 'error'; id?: number; message: string };

interface GridPosition {
  x: number;
  y: number;
  z: number;
}

interface LayerMove {
  axis: Axis;
  layer: number;
  direction: 1 | -1;
  notation: FaceTurn;
}

interface ActiveMove extends LayerMove {
  pivot: THREE.Group;
  cubies: THREE.Mesh[];
  elapsed: number;
  duration: number;
  isPending: boolean;
}

const CUBE_SIZE = 0.92;
const CUBE_SPACING = 1.06;
const TURN_DURATION = 320;
const SOLVE_TURN_DURATION = 160;
const AUTO_SHUFFLE_MIN_DELAY = 3600;
const AUTO_SHUFFLE_MAX_DELAY = 7800;
const OPENING_SHUFFLE_MIN_DELAY = 700;
const OPENING_SHUFFLE_MAX_DELAY = 1500;
const FAST_SOLVE_DEPTH = 4;
const FACE_TURNS: Record<Face, LayerMove> = {
  U: { axis: 'y', layer: 1, direction: -1, notation: 'U' },
  R: { axis: 'x', layer: 1, direction: -1, notation: 'R' },
  F: { axis: 'z', layer: 1, direction: -1, notation: 'F' },
  D: { axis: 'y', layer: -1, direction: 1, notation: 'D' },
  L: { axis: 'x', layer: -1, direction: 1, notation: 'L' },
  B: { axis: 'z', layer: -1, direction: 1, notation: 'B' },
};
const RANDOM_FACE_TURNS: FaceTurn[] = [
  'U',
  "U'",
  'R',
  "R'",
  'F',
  "F'",
  'D',
  "D'",
  'L',
  "L'",
  'B',
  "B'",
];
const FAST_SOLVER_TURNS: SolverTurn[] = [
  'U',
  "U'",
  'U2',
  'R',
  "R'",
  'R2',
  'F',
  "F'",
  'F2',
  'D',
  "D'",
  'D2',
  'L',
  "L'",
  'L2',
  'B',
  "B'",
  'B2',
];
const FACE_ORDER: Record<Face, number> = {
  U: 0,
  D: 1,
  R: 2,
  L: 3,
  F: 4,
  B: 5,
};
const OPPOSITE_FACE: Record<Face, Face> = {
  U: 'D',
  D: 'U',
  R: 'L',
  L: 'R',
  F: 'B',
  B: 'F',
};
const SOLVED_STATE_KEY = '0,1,2,3,4,5|0,1,2,3,4,5,6,7|0,0,0,0,0,0,0,0|0,1,2,3,4,5,6,7,8,9,10,11|0,0,0,0,0,0,0,0,0,0,0,0';
const TURN_STATE_CACHE = new Map<SolverTurn, CubeState>();
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

function gridToPosition(position: GridPosition): THREE.Vector3 {
  return new THREE.Vector3(
    position.x * CUBE_SPACING,
    position.y * CUBE_SPACING,
    position.z * CUBE_SPACING
  );
}

function createFaceMove(turn: FaceTurn): LayerMove {
  const face = turn[0] as Face;
  const baseMove = FACE_TURNS[face];
  const isPrime = turn.endsWith("'");

  return {
    ...baseMove,
    direction: isPrime ? ((baseMove.direction * -1) as 1 | -1) : baseMove.direction,
    notation: turn,
  };
}

function randomMove(): LayerMove {
  return createFaceMove(RANDOM_FACE_TURNS[Math.floor(Math.random() * RANDOM_FACE_TURNS.length)]);
}

function invertFaceTurn(turn: FaceTurn): FaceTurn {
  return turn.endsWith("'") ? (turn[0] as Face) : (`${turn[0]}'` as FaceTurn);
}

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomShuffleTurns(): number {
  return randomInteger(1, 3);
}

function randomShuffleDelay(): number {
  return randomInteger(AUTO_SHUFFLE_MIN_DELAY, AUTO_SHUFFLE_MAX_DELAY);
}

function getStateKey(state: CubeState): string {
  return [
    state.center.join(','),
    state.cp.join(','),
    state.co.join(','),
    state.ep.join(','),
    state.eo.join(','),
  ].join('|');
}

function cloneCubeState(state: CubeState): CubeState {
  return {
    center: [...state.center],
    cp: [...state.cp],
    co: [...state.co],
    ep: [...state.ep],
    eo: [...state.eo],
  };
}

function getTurnState(turn: SolverTurn): CubeState {
  const cachedState = TURN_STATE_CACHE.get(turn);
  if (cachedState) return cachedState;

  const turnState = cloneCubeState(new Cube().move(turn).toJSON() as CubeState);
  TURN_STATE_CACHE.set(turn, turnState);
  return turnState;
}

function applyTurnState(state: CubeState, turn: SolverTurn): CubeState {
  const move = getTurnState(turn);
  const nextState: CubeState = {
    center: Array.from({ length: 6 }, () => 0),
    cp: Array.from({ length: 8 }, () => 0),
    co: Array.from({ length: 8 }, () => 0),
    ep: Array.from({ length: 12 }, () => 0),
    eo: Array.from({ length: 12 }, () => 0),
  };

  for (let index = 0; index < 6; index += 1) {
    nextState.center[index] = state.center[move.center[index]];
  }

  for (let index = 0; index < 8; index += 1) {
    const from = move.cp[index];
    nextState.cp[index] = state.cp[from];
    nextState.co[index] = (state.co[from] + move.co[index]) % 3;
  }

  for (let index = 0; index < 12; index += 1) {
    const from = move.ep[index];
    nextState.ep[index] = state.ep[from];
    nextState.eo[index] = (state.eo[from] + move.eo[index]) % 2;
  }

  return nextState;
}

function shouldSkipSolverTurn(turn: SolverTurn, previousFace?: Face): boolean {
  if (!previousFace) return false;

  const face = turn[0] as Face;
  if (face === previousFace) return true;

  return OPPOSITE_FACE[face] === previousFace && FACE_ORDER[face] < FACE_ORDER[previousFace];
}

function searchFastSolution(
  state: CubeState,
  depth: number,
  previousFace: Face | undefined,
  visited: Set<string>
): SolverTurn[] | null {
  if (depth === 0) {
    return getStateKey(state) === SOLVED_STATE_KEY ? [] : null;
  }

  for (const turn of FAST_SOLVER_TURNS) {
    if (shouldSkipSolverTurn(turn, previousFace)) continue;

    const nextState = applyTurnState(state, turn);
    const nextStateKey = getStateKey(nextState);
    if (visited.has(nextStateKey)) continue;

    visited.add(nextStateKey);
    const remainingTurns = searchFastSolution(nextState, depth - 1, turn[0] as Face, visited);
    visited.delete(nextStateKey);

    if (remainingTurns) return [turn, ...remainingTurns];
  }

  return null;
}

function findFastSolution(state: CubeState): string | null {
  const stateKey = getStateKey(state);
  if (stateKey === SOLVED_STATE_KEY) return '';

  for (let depth = 1; depth <= FAST_SOLVE_DEPTH; depth += 1) {
    const solution = searchFastSolution(state, depth, undefined, new Set([stateKey]));
    if (solution) return solution.join(' ');
  }

  return null;
}

function parseAlgorithm(algorithm: string): LayerMove[] {
  return algorithm
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((token) => {
      const face = token[0] as Face;
      if (!(face in FACE_TURNS)) return [];

      if (token.includes('2')) {
        return [createFaceMove(face), createFaceMove(face)];
      }

      return [createFaceMove(token.endsWith("'") ? `${face}'` : face)];
    });
}

export function HeroImage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const solveRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
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
          cubie.position.copy(gridToPosition(grid));
          cubie.userData.grid = { ...grid };
          cubie.userData.homeGrid = { ...grid };

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

    const cubeModel = new Cube();
    let frameId = 0;
    let activeMove: ActiveMove | null = null;
    let previousTime = performance.now();
    let disposed = false;
    let pointerDown = false;
    let pointerMoved = false;
    let solveRequested = false;
    let solvingSequence = false;
    let waitingForSolution = false;
    let solverRequestId = 0;
    let solverWorker: Worker | null = null;
    let lastPointer = { x: 0, y: 0 };
    const moveQueue: LayerMove[] = [];
    const completedPendingMoves: FaceTurn[] = [];
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

    const getCurrentState = () => cubeModel.toJSON() as CubeState;

    const isCubeSolved = () => getStateKey(getCurrentState()) === SOLVED_STATE_KEY;

    const updateSolvedState = () => {
      container.dataset.solvedState = isCubeSolved() ? 'solved' : 'scrambled';
    };

    const enqueueMoves = (moves: LayerMove[]) => {
      moveQueue.push(...moves);
      container.dataset.shuffleState = solvingSequence ? 'solving' : 'queued';
    };

    const handleSolverMessage = (message: SolverMessage) => {
      if (disposed) return;

      if (message.type === 'solution') {
        if (message.id !== solverRequestId) return;

        waitingForSolution = false;
        solvingSequence = true;
        solveRequested = false;

        // Collect moves applied to the cube during the worker wait so they can be undone
        const activePendingNotation = activeMove?.isPending ? activeMove.notation : null;
        if (activeMove) activeMove.isPending = false;
        const allPending: FaceTurn[] = [
          ...completedPendingMoves,
          ...(activePendingNotation ? [activePendingNotation] : []),
        ];
        completedPendingMoves.length = 0;
        // Clear any queued pending idle moves that have not started yet
        moveQueue.length = 0;

        const undoMoves = allPending.slice().reverse().map((n) => createFaceMove(invertFaceTurn(n)));
        const solutionMoves = parseAlgorithm(message.algorithm);
        const combinedMoves = [...undoMoves, ...solutionMoves];

        if (combinedMoves.length === 0) {
          solvingSequence = false;
          container.dataset.shuffleState = 'idle';
          updateSolvedState();
          return;
        }

        enqueueMoves(combinedMoves);
        return;
      }

      if (message.type === 'error') {
        waitingForSolution = false;
        solvingSequence = false;
        solveRequested = false;
        container.dataset.shuffleState = 'idle';
        console.error(message.message);
      }
    };

    const getSolverWorker = () => {
      if (solverWorker) return solverWorker;

      solverWorker = new Worker(new URL('./cubeSolver.worker.ts', import.meta.url));
      solverWorker.addEventListener('message', (event: MessageEvent<SolverMessage>) => {
        handleSolverMessage(event.data);
      });
      solverWorker.postMessage({ type: 'warm' });
      return solverWorker;
    };

    const requestSolution = () => {
      if (waitingForSolution) return;

      const cubeState = getCurrentState();
      const fastSolution = findFastSolution(cubeState);

      if (fastSolution !== null) {
        solveRequested = false;
        solvingSequence = true;
        container.dataset.solveSource = 'short';
        const solutionMoves = parseAlgorithm(fastSolution);

        if (solutionMoves.length === 0) {
          solvingSequence = false;
          container.dataset.shuffleState = 'idle';
          updateSolvedState();
          return;
        }

        enqueueMoves(solutionMoves);
        return;
      }

      waitingForSolution = true;
      container.dataset.shuffleState = 'solving';
      container.dataset.solveSource = 'worker';
      getSolverWorker().postMessage({
        type: 'solve',
        id: (solverRequestId += 1),
        state: cubeState,
      });
    };

    const requestSolve = () => {
      moveQueue.length = 0;
      completedPendingMoves.length = 0;
      if (activeMove) activeMove.isPending = false;
      solveRequested = true;
      solvingSequence = false;
      waitingForSolution = false;

      if (!activeMove) {
        requestSolution();
      }
      // If there is an active move, let it finish naturally;
      // finishMove will call requestSolution when done.
    };

    const queueShuffle = (turns = 7) => {
      if (solveRequested || waitingForSolution || solvingSequence) return;

      const moves = Array.from({ length: turns }, randomMove);
      enqueueMoves(moves);
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
        duration: solvingSequence ? SOLVE_TURN_DURATION : TURN_DURATION,
        isPending: waitingForSolution,
      };
      container.dataset.shuffleState = solvingSequence ? 'solving' : 'turning';
    };

    const finishMove = (move: ActiveMove) => {
      move.pivot.rotation[move.axis] = move.direction * Math.PI * 0.5;
      move.pivot.updateMatrixWorld(true);

      move.cubies.forEach((cubie) => {
        cubeRoot.attach(cubie);
        const grid = updateGridPosition(
          cubie.userData.grid as GridPosition,
          move.axis,
          move.direction
        );
        cubie.userData.grid = grid;
        cubie.position.copy(gridToPosition(grid));
      });

      cubeRoot.remove(move.pivot);
      cubeModel.move(move.notation);
      updateSolvedState();
      if (move.isPending && waitingForSolution) {
        completedPendingMoves.push(move.notation);
      }
      activeMove = null;

      if (solveRequested) {
        requestSolution();
      } else if (moveQueue.length > 0) {
        container.dataset.shuffleState = solvingSequence ? 'solving' : 'queued';
      } else {
        if (solvingSequence) solvingSequence = false;
        container.dataset.shuffleState = 'idle';
      }
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

      // Keep the cube doing slow idle turns while the worker computes a solution
      if (!activeMove && moveQueue.length === 0 && waitingForSolution) {
        moveQueue.push(randomMove());
      }

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
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
      if (!pointerMoved) requestSolve();
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);

    container.dataset.shuffleState = 'idle';
    updateSolvedState();
    let shuffleTimer = 0;
    const scheduleShuffle = () => {
      shuffleTimer = window.setTimeout(() => {
        if (!disposed) {
          if (!pointerDown && moveQueue.length < 2) queueShuffle(randomShuffleTurns());
          scheduleShuffle();
        }
      }, randomShuffleDelay());
    };
    const openingShuffleTimer = window.setTimeout(() => {
      queueShuffle(randomShuffleTurns());
      scheduleShuffle();
    }, randomInteger(OPENING_SHUFFLE_MIN_DELAY, OPENING_SHUFFLE_MAX_DELAY));
    const warmTimer = window.setTimeout(() => {
      getSolverWorker();
    }, 1200);
    solveRef.current = requestSolve;
    frameId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      solveRef.current = null;
      window.clearTimeout(shuffleTimer);
      window.clearTimeout(openingShuffleTimer);
      window.clearTimeout(warmTimer);
      cancelAnimationFrame(frameId);
      observer.disconnect();
      solverWorker?.terminate();
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
      aria-label="Solve rotating Rubik cube"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          solveRef.current?.();
        }
      }}
    >
      <div
        ref={containerRef}
        data-hero-rubik
        className="absolute -inset-8 overflow-visible md:-inset-10 lg:-inset-12"
      />
    </motion.div>
  );
}
