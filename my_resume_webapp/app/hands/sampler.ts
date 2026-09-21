import {
  buildContours,
  distanceToEdge,
  isInside,
  VIEW_HEIGHT,
  VIEW_WIDTH,
  type Contour,
} from "./silhouette";

const TAU = Math.PI * 2;

export type Dot = {
  x: number;
  y: number;
  r: number;
  /** 0 at the edge of the silhouette, 1 well inside it. */
  depth: number;
  /** Phase offset so the shimmer travels across the hands. */
  phase: number;
  /** When this dot joins the reveal: 0 at the wrists, 1 at the fingertips. */
  delay: number;
};

/**
 * Maps canvas pixels onto the traced contours' coordinate space. The whole
 * height is always shown; the forearms simply run off the left and right
 * edges, which is how they leave frame in the reference.
 */
export type Mapping = { scale: number; originX: number };

export function mapping(width: number, height: number): Mapping {
  const scale = height / VIEW_HEIGHT;
  return { scale, originX: VIEW_WIDTH / 2 - width / 2 / scale };
}

/** True when a canvas pixel falls inside either traced hand. */
export function hitTest(
  x: number,
  y: number,
  map: Mapping,
  contours: Contour[],
): Contour | null {
  const vx = map.originX + x / map.scale;
  const vy = y / map.scale;
  for (const contour of contours) {
    if (isInside(vx, vy, contour)) return contour;
  }
  return null;
}

/** Dot pitch in CSS pixels, scaled with the composition. */
export function spacingFor(width: number): number {
  return Math.max(3.2, Math.min(6.4, width / 200));
}

/**
 * A regular hexagonal grid of points, clipped by the traced hand contours.
 * The silhouette is never altered here: dots are only kept or discarded.
 */
export function buildDots(width: number, height: number, spacing: number): Dot[] {
  const dots: Dot[] = [];
  const map = mapping(width, height);
  const contours = buildContours();
  const rowHeight = spacing * 0.866;
  const centre = width / 2;

  for (let row = 0; row * rowHeight <= height + rowHeight; row += 1) {
    const y = row * rowHeight;
    const offset = row % 2 === 0 ? 0 : spacing / 2;

    for (let x = offset; x <= width + spacing; x += spacing) {
      const contour = hitTest(x, y, map, contours);
      if (!contour) continue;

      const vx = map.originX + x / map.scale;
      const vy = y / map.scale;
      const edge = distanceToEdge(vx, vy, contour) * map.scale;
      const depth = Math.min(1, edge / (spacing * 1.6));

      dots.push({
        x,
        y,
        r: spacing * 0.32 * (0.82 + 0.18 * depth),
        depth,
        phase: (x * 0.013 + y * 0.021) % TAU,
        // Dots near the centre line are the fingertips: they arrive last.
        delay: 1 - Math.min(1, Math.abs(x - centre) / centre),
      });
    }
  }

  return dots;
}
