import Cube from 'cubejs';

interface CubeState {
  center: number[];
  cp: number[];
  co: number[];
  ep: number[];
  eo: number[];
}

type SolverRequest =
  | { type: 'warm' }
  | { type: 'solve'; id: number; state: CubeState };

let initialized = false;

function ensureSolverReady() {
  if (initialized) return;
  Cube.initSolver();
  initialized = true;
}

self.addEventListener('message', (event: MessageEvent<SolverRequest>) => {
  try {
    if (event.data.type === 'warm') {
      ensureSolverReady();
      self.postMessage({ type: 'ready' });
      return;
    }

    ensureSolverReady();
    const cube = new Cube(event.data.state);
    self.postMessage({
      type: 'solution',
      id: event.data.id,
      algorithm: cube.solve(),
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      id: event.data.type === 'solve' ? event.data.id : undefined,
      message: error instanceof Error ? error.message : 'Unable to solve cube',
    });
  }
});
