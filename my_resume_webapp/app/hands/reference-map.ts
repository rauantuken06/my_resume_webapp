/**
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
export const CELL_X = 4;
export const CELL_Y = 8;

/**
 * Half-diagonal of the largest dot in the reference, in reference pixels.
 * A cell at level 15 is drawn this big; smaller levels scale down linearly,
 * which is what renders the shadows inside the hands.
 */
export const MAX_DOT_RADIUS = 2.441;

export const MAP_COLS = 205;
export const MAP_ROWS = 31;

/** Full extent of the dot field in reference pixels. */
export const VIEW_WIDTH = MAP_COLS * CELL_X;
export const VIEW_HEIGHT = MAP_ROWS * CELL_Y;

/**
 * One character per lattice cell, row-major. A dot is "B" (smallest, deepest
 * shadow) through "P" (largest, fully lit); "." is an empty cell. The value is
 * the square root of the cell's ink, so it maps linearly to dot radius.
 */
export const MAP = [
  "............................................................................................................................................................................................................F",
  "........................................................................................................................................................................................................FGOOP",
  "....................................................................................................................................................................................................FHOOOOOOO",
  "...................................GHKOOOOOPOOKGGFGGFFGGGFGF...................................................................................................................................FGHNOOOOOOOOOO",
  "................................IJOOOOPPOPOOOOOOPOOOOOOOOOOOOOGFGHGGGGGGGGG...........................................................................................................FGGGGGGGNOPPPOOOOOOOOOO",
  "............................GIOOPPPOOOOOOOOPOOOOPOOOOOOPOOOOOOPOOPOOOOOOOOHGFG................................................................................................GGGGKOOPPOPOOOOOOPPOPOOOOOOOOOO",
  "........................GGHOOOOOOOOOOOOOOOPPOOOPPOOPPPOOOOOOOOPOOOOOOOOOOOPNGGGF.......................................................................................GGFGJOPOOOPOOOPPPPOOOOOOOPOOOOOOOOOOOO",
  "..................FGGPOOOOOOOPOOPOMFFGGGLOOPOOOOPOOOOOOPOOOOOOOOOOOOOPOOOOOOOOMGFFF..............................................................................GGOOOOOOOPOOOOOOPOOOPPOOOOPOOOOOOOOOOOOOOOOO",
  "..............FGPOOOOOOOOOPOOOONGFGGFGGGGLPPOOOOOOOOOOOOOOOOPOOOOOOOOOOOOOPOPOOOOPMGGGFF.................................................................GGFFGGOOOOOOPOOOOPOOOOOOPOOOOPOOOOPOOOOOOOOOOOOOOOOO",
  ".........GGGOOOOOOOOOPOOOOOOOOOOOMGFGGGHHGMOOOOOOOOOOOOOOOOOOOOOOOOHNHOOOOOOOOOOOOOOOOLHGGD.......................................................GHGGNOOOOOOOPOOOOOOOOOOOOOOOOOOOOOOOPOOOOOOOOOOOOOOOOOOOOOO",
  ".....FHGNOOOOOOOOOOOOOOOOOOOOONGGFGFFGGFGGMPOOOOOOOPOOOOOOOGFGGFGGFFGFFFFFGGFJOOOOOOOOPLGGGC.................................................EHGNOOOOOOOOOOOOOOOOOOOOOOONFGGGGGJOOOOOOPOOOOPOOOOOOPOOOOOOOOOO",
  "FFGNOPOOOOOOOOPOOOOOOOOOOOONGGFGGGGFGGGGGGGMOOOOPOOOOOOOOOOGFGGFGGFGGFFFGFGGFGGFFGKOOOPOOOOL.............................................DHGMOOOOOOOPOOOOOOOPOOOOGFGGGFGGFGFFGGFGGKOOOMGGGFGGGGFFGHGGGGFGFFGG",
  "POPOOOOOOOOOOOOOOOOOOOOOOONGGGFFGGGGGGGGGGGGMOOOPOOOPOOOOOOOOHHGGHGGGGFGGFGGFGGFGGGGGLPOOPOPKH....................................GGFGHLOOOOOOOOOOOOOOOOOOOOOOPFGFGGGGGGGFGGGGGFGGGGGHFGGGFGFGFFFGHFGHFFGFFHG",
  "POOOOOOOOOOOOOPOOOOOOOOOOGGGHGGGGFGGGGGGE..EIMOOOOOOPOOOOOOOOOGGGH...FFGGFGGFGGGGGGGGGGHLOOPOJH....................GFFGIOOPOOOOOOPOOOOPOOOOPOOOOOOOOOOOOOOOOOOOGGFFGFFGGGFGGFGGFGGGGGGGGGGGGGGGFFGGGGGGFGFGGH",
  "POOOPOOOOOOOOOOOOOOPOOGFGGFGGGFGGFFFF........FGGGGGNPOOOOOOOOOOOOGGF..FFGFGGFGGGGGGGGGFGGGMPOOJF..............FFFOOOOOOOOOOOOOOOOPOOOOPOOOOKGMOOPOOPPOOPOOOOOOOGGGFGFFFGGFGGFGGFGGGGGGFGGGFFGGGFFGGFGGFFGFFGG",
  "OOOOOOOOOOOOOOOOOGGGGGGGGGFGGGGGGFF.............GGGGGGNOOOOOOOOOOOOOGFFFGGGGF.GFFGGGHGGGGGGGMOOOIF......FGFOOOOOOOOOOOGFFGFFGGGGGKOOOOOOLGGFMOOOOOOOOOOOOOOOOHGFGGGGGGFGGGGGGGGFGGGGGGGGGGFGGFGFFGGFGGFFGFFGG",
  "OOOOPOOOIGFGGGGGFGGGFGGFGGFFGGFFGF...................FGGGGGGGOPOOOOOOOGGGFGGF..FFFGGGGFGGGGGGMOOOJG....FOOOOOOGGFFGGFGGFFGFFGGGGGFGLOLHGGGMOOOOOPOJNOOOOOOHGGGGFGGFGGFFGGFGGFGGGFGGGGGFGGGFGFFGFFGGFGGFFFFFGG",
  "POOOPJGGGGFGGGGGFFGGGGGFGGFGGGGG...........................FGGGOOOOOOOOONGGGF...FGFGGGGHGGD.EHGNOOOI...FGGGGGFGGFGG..............FGGFGGGLOOOOOOOJFGHGFGFFGGFGGGFGGGGGGFGGG.......DGGGGGGGGFGGGGGFGHGGGFFGFGGG",
  "POOOJGGGGGFFGGGGGFGFFGGGGGFFGF.................................FGHGGOOOOOOPNGF...GFGGGFGGGD...GGGGGG...............................DHHLOOOOOOOKHHGHHGGGHGGGFFGGFGGFGGFFG.....................................",
  "POJGGGGGGGGGGGGGFGGGFGFFGGF.......................................FFGFGGHOOOONHFCGFGGGGHGGGD......................................HKOOPOOOOKGHGGHFGHGFGGFGGGGGGGGGGGGG.......................................",
  "POJGHHGGGGGGGGGGFGGGFFFFG...........................................GFGGGIPOOOMF.FFGGGFGGGGC....................................HKOOOOPOLHGGGGGHGFGHFFGFGGGFFGGFGGFG.........................................",
  "KGGFGHGGGGFGGGGGFGGGFG.............................................GGGGGGFIOOOMG.CGGGGFHGGGG..................................IJOPOOOOLHGGGGGGGGGGGGFGGFFGGFFGGG.............................................",
  "GGGFGGGGGFFGGGGGFFG.................................................GGGF....GH.....GGGFFEHG..................................JOOOOOLGGHGGGGGGGGGGGGGGGGFGGGF.................................................",
  "FGGFGGGGGFGGGGGG.............................................................................................................JOOOMGGFGGGGGGFGGGGGFGHF........................................................",
  "GGGGGGGGGFFGG.................................................................................................................FGGFGGGLOLGGG..GGGGFGGF........................................................",
  "GGGFGGFGGF.....................................................................................................................KPMGGFLPKHG...FNOJFGG.........................................................",
  "GGGGGGG.......................................................................................................................IOOMGGGLPKHG....FGGGGH.........................................................",
  "GGFFGD.........................................................................................................................JOOMGGKPKHG....FNJGG..........................................................",
  "F..............................................................................................................................CKOMHHKOKIG....FNOIG..........................................................",
  "................................................................................................................................IPLHHKMGGGD....GGFG..........................................................",
  ".................................................................................................................................FGGFEGGGE..................................................................."
].join("");
