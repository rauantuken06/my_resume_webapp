"""Extracts the reference halftone into app/hands/reference-map.ts.

The reference image lays its dots on a lattice 4px wide by 8px tall. This reads
the brightness at every lattice position and writes it out as one character per
cell, so the site can reproduce the reference exactly rather than approximating
it with a drawn shape.

Usage: python scripts/extract-reference.py
"""

from PIL import Image
import numpy as np

SOURCE = "public/refernce.png"
TARGET = "app/hands/reference-map.ts"

# Lattice, measured from the source by autocorrelating its ink profile.
CELL_X, CELL_Y = 4, 8
# Vertical phase chosen so each dot sits in the middle of its cell rather than
# straddling a boundary; found by taking the circular centroid of the ink.
ORIGIN_X, ORIGIN_Y = 0, 23
MAP_ROWS = 31
INK_THRESHOLD = 30


def main() -> None:
    lum = np.asarray(Image.open(SOURCE).convert("L")).astype(np.float32)
    height, width = lum.shape

    cols = range(ORIGIN_X, width - CELL_X + 1, CELL_X)

    # Normalise tone against the largest dot in the image, so a fully lit cell
    # is level 15 and the level maps straight onto dot radius.
    peak = 0.0
    for row in range(MAP_ROWS):
        band = lum[ORIGIN_Y + row * CELL_Y : ORIGIN_Y + (row + 1) * CELL_Y]
        for x in cols:
            cell = band[:, x : x + CELL_X]
            if float(cell.max()) > INK_THRESHOLD:
                peak = max(peak, float(cell.sum()))

    # Half-diagonal, in reference pixels, of a diamond holding the peak ink.
    max_radius = (peak / 255.0 / 2.0) ** 0.5

    lines = []
    for row in range(MAP_ROWS):
        band = lum[ORIGIN_Y + row * CELL_Y : ORIGIN_Y + (row + 1) * CELL_Y]
        line = []
        for x in cols:
            # Sample exactly one cell. A wider window would let neighbouring
            # dots leak in, since the horizontal pitch is only four pixels.
            cell = band[:, x : x + CELL_X]
            if float(cell.max()) <= INK_THRESHOLD:
                line.append(".")
            else:
                # Tone is carried by how much ink the cell holds, not by how
                # bright its brightest pixel is: this is a halftone, so a dark
                # region is drawn with small dots rather than dim ones. Ink is
                # what recovers the shading inside the hands.
                ink = float(cell.sum()) / peak
                level = max(1, min(15, round(ink ** 0.5 * 15)))
                line.append(chr(65 + level))
        lines.append("".join(line))

    body = ",\n".join('  "%s"' % line for line in lines)
    out = open(TARGET, "w", encoding="utf-8")
    out.write(TEMPLATE % (CELL_X, CELL_Y, round(max_radius, 3), len(lines[0]), len(lines), body))
    out.close()
    print("peak cell ink %.0f -> max dot radius %.2f reference px" % (peak, max_radius))
    print("wrote %s (%d rows x %d cols)" % (TARGET, len(lines), len(lines[0])))


TEMPLATE = '''/**
 * The reference halftone, extracted from public/refernce.png.
 *
 * This is not a drawing of hands and not an anatomical model. It is the
 * reference image's own dot field, read straight off the source: the image
 * lays its dots on a lattice 4px wide by 8px tall, and each cell below records
 * whether that lattice position carries a dot and how much ink it holds.
 *
 * Tone is carried by dot SIZE, the way a printed halftone works: the shadows
 * inside the hands are drawn with small dots, the lit surfaces with large
 * ones. Rendering this map reproduces the reference, shading included, at any
 * scale.
 *
 * Regenerate with scripts/extract-reference.py if the source image changes.
 */

/** Lattice cell size in reference pixels. Dots are wider than they are tall. */
export const CELL_X = %d;
export const CELL_Y = %d;

/**
 * Half-diagonal of the largest dot in the reference, in reference pixels.
 * A cell at level 15 is drawn this big; smaller levels scale down linearly,
 * which is what renders the shadows inside the hands.
 */
export const MAX_DOT_RADIUS = %s;

export const MAP_COLS = %d;
export const MAP_ROWS = %d;

/** Full extent of the dot field in reference pixels. */
export const VIEW_WIDTH = MAP_COLS * CELL_X;
export const VIEW_HEIGHT = MAP_ROWS * CELL_Y;

/**
 * One character per lattice cell, row-major. A dot is "B" (smallest, deepest
 * shadow) through "P" (largest, fully lit); "." is an empty cell. The value is
 * the square root of the cell's ink, so it maps linearly to dot radius.
 */
export const MAP = [
%s
].join("");
'''

if __name__ == "__main__":
    main()
