import manifest from './image-dimensions.json';

type Dimensions = { width: number; height: number };

const dimensions: Record<string, Dimensions> = manifest as Record<string, Dimensions>;

export function getImageDimensions(src: string): Dimensions | null {
  return dimensions[src] ?? null;
}
