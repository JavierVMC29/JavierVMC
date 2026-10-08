declare module "wawoff2" {
  /** Converts a WOFF2 font into TTF. */
  export function decompress(buffer: Uint8Array): Promise<Uint8Array>;
}
