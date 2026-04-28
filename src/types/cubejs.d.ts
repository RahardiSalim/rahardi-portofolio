declare module 'cubejs' {
  interface CubeState {
    center: number[];
    cp: number[];
    co: number[];
    ep: number[];
    eo: number[];
  }

  class Cube {
    constructor(state?: Cube | CubeState);

    move(algorithm: string | number | number[]): this;
    solve(maxDepth?: number): string;
    toJSON(): CubeState;
    isSolved(): boolean;

    static initSolver(): void;
  }

  export = Cube;
}
