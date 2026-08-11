declare module 'express' {
  export interface Request {}
  export interface Response {
    send(body: unknown): this;
    json(body: unknown): this;
  }

  export interface Application {
    use: (...args: any[]) => any;
    get(path: string, handler: (...args: any[]) => any): void;
    listen(port: number, callback?: () => void): void;
  }

  export interface Router {
    get(path: string, handler: (...args: any[]) => any): void;
  }

  export function json(): any;
  export function default(): Application;
  export const Router: any;
}
