/**
 * Traced hand silhouettes.
 *
 * These are NOT generated from an anatomical model. Each hand is one fixed,
 * hand-tuned closed contour written as SVG path data and traced against the
 * reference image. The two hands are completely independent: nothing is shared
 * between them, and neither is derived from finger lengths, joint angles or
 * any other parameter. Editing a contour means editing its path data here.
 *
 * Coordinates are in the reference image's own pixel space, so a point read
 * off the reference can be typed in directly.
 */

export const VIEW_WIDTH = 820;
export const VIEW_HEIGHT = 320;

/**
 * Left hand: forearm entering from the left edge, back of the hand sloping
 * down to the right, index finger extended toward the centre, the remaining
 * three fingers hanging down and slightly right with gaps between them.
 */
export const LEFT_PATH = `
  M -300 30
  C -150 24 60 22 140 24
  C 168 26 192 30 210 34
  C 252 42 286 54 312 72
  C 322 79 328 84 332 90
  C 354 106 378 130 396 152
  C 403 160 399 169 391 165
  C 374 154 354 134 336 120
  C 326 116 312 116 302 130
  C 308 154 312 178 310 198
  C 311 210 300 212 296 201
  C 293 178 290 154 284 138
  C 280 130 270 129 262 134
  C 264 158 264 184 260 204
  C 258 216 247 217 244 206
  C 241 182 237 158 231 144
  C 227 136 217 135 209 140
  C 209 162 207 182 203 199
  C 201 210 190 211 187 200
  C 185 180 181 162 175 150
  C 165 140 150 136 132 138
  C 100 144 30 152 -80 160
  C -160 164 -240 166 -300 166
  Z
`;

/**
 * Right hand: forearm entering diagonally from the upper right, index finger
 * reaching left toward the other hand, and three fingers hanging well below
 * the palm as separate strands.
 */
export const RIGHT_PATH = `
  M 1120 -30
  C 1010 0 900 18 800 34
  C 750 44 700 62 650 84
  C 600 102 562 118 536 132
  C 512 144 478 158 448 170
  C 436 176 432 186 442 187
  C 456 184 486 172 512 162
  C 524 157 532 156 538 160
  C 534 186 528 214 524 240
  C 522 254 533 258 538 247
  C 543 222 549 196 554 176
  C 558 168 566 167 571 173
  C 569 202 565 234 564 262
  C 563 278 575 282 580 270
  C 585 238 591 204 596 184
  C 600 176 608 175 613 181
  C 612 206 610 232 610 252
  C 610 266 622 269 627 257
  C 631 232 635 208 640 192
  C 652 180 672 172 700 168
  C 760 160 830 150 900 138
  C 990 122 1060 104 1120 88
  Z
`;

type Point = { x: number; y: number };

/** Parses the subset of SVG path syntax used above into a flat polygon. */
function flatten(path: string, steps: number): Point[] {
  const tokens = path.trim().split(/[\s,]+/);
  const points: Point[] = [];
  let i = 0;
  let cx = 0;
  let cy = 0;

  const num = () => Number(tokens[i++]);

  while (i < tokens.length) {
    const command = tokens[i++];

    if (command === "M") {
      cx = num();
      cy = num();
      points.push({ x: cx, y: cy });
    } else if (command === "L") {
      cx = num();
      cy = num();
      points.push({ x: cx, y: cy });
    } else if (command === "C") {
      const x1 = num();
      const y1 = num();
      const x2 = num();
      const y2 = num();
      const x3 = num();
      const y3 = num();
      for (let s = 1; s <= steps; s += 1) {
        const t = s / steps;
        const u = 1 - t;
        points.push({
          x: u * u * u * cx + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
          y: u * u * u * cy + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
        });
      }
      cx = x3;
      cy = y3;
    } else if (command === "Z" || command === "z") {
      // Closing is implicit: the polygon test wraps around.
    } else if (command.length > 0) {
      throw new Error(`Unsupported path command: ${command}`);
    }
  }

  return points;
}

export type Contour = { points: Point[]; minX: number; maxX: number; minY: number; maxY: number };

function toContour(path: string): Contour {
  const points = flatten(path, 14);
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { points, minX, maxX, minY, maxY };
}

export function buildContours(): Contour[] {
  return [toContour(LEFT_PATH), toContour(RIGHT_PATH)];
}

/** Crossing-number point-in-polygon test. */
export function isInside(x: number, y: number, contour: Contour): boolean {
  if (x < contour.minX || x > contour.maxX || y < contour.minY || y > contour.maxY) {
    return false;
  }

  const pts = contour.points;
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const a = pts[i];
    const b = pts[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
  }
  return inside;
}

/** Distance from a point to the contour outline, used to size dots. */
export function distanceToEdge(x: number, y: number, contour: Contour): number {
  const pts = contour.points;
  let best = Infinity;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const a = pts[i];
    const b = pts[j];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len2 = dx * dx + dy * dy;
    let t = len2 > 0 ? ((x - a.x) * dx + (y - a.y) * dy) / len2 : 0;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const px = a.x + t * dx - x;
    const py = a.y + t * dy - y;
    const d = px * px + py * py;
    if (d < best) best = d;
  }
  return Math.sqrt(best);
}
