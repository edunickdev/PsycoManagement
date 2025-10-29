declare module "bcryptjs" {
  export function hash(data: string | Buffer, salt: string | number): Promise<string>;
  export function hashSync(data: string | Buffer, salt: string | number): string;
  export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;
  export function compareSync(data: string | Buffer, encrypted: string): boolean;
  export function genSaltSync(rounds?: number): string;
}
