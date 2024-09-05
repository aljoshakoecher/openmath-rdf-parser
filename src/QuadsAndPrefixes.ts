import { Quad } from "n3";

export interface QuadsAndPrefixes {
  quads: Quad[];
  prefixes: Record<string, string>;
}
