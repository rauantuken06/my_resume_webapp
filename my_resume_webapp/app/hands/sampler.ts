import {
  CELL_X,
  CELL_Y,
  MAP,
  MAP_COLS,
  MAP_ROWS,
  MAX_DOT_RADIUS,
  VIEW_HEIGHT,
  VIEW_WIDTH,
} from "./reference-map";

/** How many bright bands are visible across the composition at once. */
const WAVE_CYCLES = 2.2;

/**
 * Shadow depth. The reference carries tone in dot size alone; dimming the
 * small dots a little as well makes the shadows inside the hands read deeper
 * without altering the shapes. 1 would be exactly the reference.
 */
const SHADOW_FLOOR = 0.72;

/**
 * Smallest dot drawn, as a fraction of the largest. Stops the deepest shadow
 * cells from vanishing entirely once anti-aliasing takes a bite out of them.
 */
const MIN_DOT_SCALE = 0.26;

export type Dot = {
  x: number;
  y: number;
  r: number;
  /** Half-width and half-height of the diamond mark. */
  ry: number;
  /** Brightness multiplier, deepening the shadow cells slightly. */
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
 * geometry: cell occupancy and tone both come straight from the source image.
 *
 * Tone becomes dot size, as it is in the source. A cell deep in shadow under
 * the palm or between the fingers carries a quarter of the ink of a lit cell
 * on the back of a hand, so it is drawn a quarter the size, and the shading
 * inside the hands appears without any of it being painted in by hand.
 */
export function buildDots(width: number, height: number): Dot[] {
  const scale = scaleFor(width);
  // Centre vertically in case the canvas is not exactly the reference aspect.
  const offsetY = (height - VIEW_HEIGHT * scale) / 2;
  const maxRadius = MAX_DOT_RADIUS * scale;
  const centre = width / 2;

  const dots: Dot[] = [];

  for (let row = 0; row < MAP_ROWS; row += 1) {
    for (let col = 0; col < MAP_COLS; col += 1) {
      const cell = MAP.charCodeAt(row * MAP_COLS + col);
      // "." marks an empty lattice position.
      if (cell === 46) continue;

      // Level 15 is a fully lit cell, level 1 the deepest shadow.
      const tone = (cell - 65) / 15;
      const size = MIN_DOT_SCALE + (1 - MIN_DOT_SCALE) * tone;
      const radius = maxRadius * size;

      dots.push({
        x: (col * CELL_X + CELL_X / 2) * scale,
        y: offsetY + (row * CELL_Y + CELL_Y / 2) * scale,
        r: radius,
        ry: radius,
        shade: SHADOW_FLOOR + (1 - SHADOW_FLOOR) * tone,
        delay: 1 - Math.min(1, Math.abs((col * CELL_X + CELL_X / 2) * scale - centre) / centre),
        phase: (col / MAP_COLS) * WAVE_CYCLES * Math.PI * 2,
      });
    }
  }

  return dots;
}
