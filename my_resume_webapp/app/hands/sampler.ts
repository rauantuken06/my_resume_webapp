import {
  CELL_X,
  CELL_Y,
  MAP,
  MAP_COLS,
  MAP_ROWS,
  VIEW_HEIGHT,
  VIEW_WIDTH,
} from "./reference-map";

/** How many bright bands are visible across the composition at once. */
const WAVE_CYCLES = 2.2;

export type Dot = {
  x: number;
  y: number;
  r: number;
  /** Half-width and half-height of the diamond mark. */
  ry: number;
  /** Brightness as read from the reference, 0 to 1. Carries its shading. */
  shade: number;
  /** When this dot joins the reveal: 0 at the arms, 1 at the fingertips. */
  delay: number;
  /**
   * Position along the travelling brightness wave, in radians. It comes from
   * the dot's column, so neighbouring columns light up just after one another
   * and the pulse reads as a band sweeping across the hands.
   */
  phase: number;
};

/**
 * Maps the reference's pixel space onto the canvas. The dot field is scaled
 * uniformly to cover the canvas width, so proportions are exactly the
 * reference's and the arms reach the frame edges as they do in the source.
 */
export function scaleFor(width: number): number {
  return width / VIEW_WIDTH;
}

/**
 * Turns the extracted reference map into drawable dots. Nothing here invents
 * geometry: cell occupancy and brightness both come straight from the source
 * image, and the only decisions are position scaling and reveal order.
 */
export function buildDots(width: number, height: number): Dot[] {
  const scale = scaleFor(width);
  // Centre vertically in case the canvas is not exactly the reference aspect.
  const offsetY = (height - VIEW_HEIGHT * scale) / 2;
  // The reference draws each dot as a small diamond, four reference pixels
  // across and four tall. Its area, and so the total ink, matches the source.
  const radius = CELL_X * 0.45 * scale;
  const radiusY = CELL_X * 0.45 * scale;
  const centre = width / 2;

  const dots: Dot[] = [];

  for (let row = 0; row < MAP_ROWS; row += 1) {
    for (let col = 0; col < MAP_COLS; col += 1) {
      const cell = MAP.charCodeAt(row * MAP_COLS + col);
      // "." marks an empty lattice position.
      if (cell === 46) continue;

      const level = cell - 65;
      dots.push({
        x: (col * CELL_X + CELL_X / 2) * scale,
        y: offsetY + (row * CELL_Y + CELL_Y / 2) * scale,
        r: radius,
        ry: radiusY,
        shade: level / 15,
        delay: 1 - Math.min(1, Math.abs((col * CELL_X + CELL_X / 2) * scale - centre) / centre),
        phase: (col / MAP_COLS) * WAVE_CYCLES * Math.PI * 2,
      });
    }
  }

  return dots;
}
