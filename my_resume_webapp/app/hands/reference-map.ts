/**
 * The reference halftone, extracted from public/refernce.png.
 *
 * This is not a drawing of hands and not an anatomical model. It is the
 * reference image's own dot field, read straight off the source: the image
 * lays its dots on a lattice 4px wide by 8px tall, and each cell below records
 * whether that lattice position carries a dot and how bright it is. Rendering
 * this map reproduces the reference, shading included, at any scale.
 *
 * Regenerate with scripts/extract-reference.py if the source image changes.
 */

/** Lattice cell size in reference pixels. Dots are wider than they are tall. */
export const CELL_X = 4;
export const CELL_Y = 8;

export const MAP_COLS = 205;
export const MAP_ROWS = 31;

/** Full extent of the dot field in reference pixels. */
export const VIEW_WIDTH = MAP_COLS * CELL_X;
export const VIEW_HEIGHT = MAP_ROWS * CELL_Y;

/**
 * One character per lattice cell, row-major. A dot is "B" (dimmest) through
 * "P" (full brightness); "." is an empty cell.
 */
export const MAP = [
  "............................................................................................................................................................................................................L",
  "........................................................................................................................................................................................................NLPPP",
  "....................................................................................................................................................................................................HNPPPPPPP",
  "...................................KOPPPPPPPPPONNKKKKLNOOOOM...................................................................................................................................NJLPPPPPPPPPPP",
  "................................LPPPPPPPPPPPPPPPPPPPOPPPPPPPPPMILNOOONOONLN...........................................................................................................LLNNNOLMPPPPPPPPPPPPPPP",
  "............................NOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPOMKO................................................................................................MMNNPPPPPPPPPPPPPPPPPPOPPPPPPPP",
  "........................LKMPPPPPPPPPPPPPPPPPPPPPPPPPOPPPPPOPPPPPPPPPPPPOPPPPJMNN.......................................................................................LMIKOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
  "..................PONPPPPPPPPPPPPPPPPOLNOPPPPPPPPPPPPPPPPPPPPPOOPPPOPPPPPPPPPOPPOPO..............................................................................LHOPPPPPPPPPPPPPPPPPPPPPPPPPOPPPPPPPPPPPPPPP",
  "..............OOPPPPPPPPPPPPPPPPNNNONNMLMPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPONNMII.................................................................OOMLKJOPPPPPPPPPOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
  ".........NPPPPPPPPPPPPPPPPPPPPPPPPOOOLMNMNPPPPPPPPPPPPPPPPPPPPPPPPPOPOPPPPPPPPPPPPPPPPOMMLF.......................................................NPNMPPPPPPPPPPPPPPPPPPPPPOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
  ".....OOOPPPPPPPPPPPPPPPPPPPPPPPOONNONNMLLLPPPPPPPPPPPPPPPPPMLNMHLMLNNNONNLMLJOPPPPPPPPPPLMNC.................................................KKMPPPPPPPPPPPPPPPPPPPPPPPPPIKMLOOPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP",
  "MNOPPPPPPPPPPPPPPPPPPPPPPPPPMLLOOOPOONMMMMMPPPPPPPPPPPPPPPPMMOOJLNMNNNPOOMOMKNPPNPPPPPPPPPPP.............................................DOPPPPPPPPPPPPPPPPPPPPPPOOPPPNMNILLLPOPPOPPPPPNPOOPNOOJJLOMOPPNOMMPM",
  "PPPPPPPPPPPPPPPPPPPPPPPPPPPLLKKOOMOOONLMMMLNPPPPPPPPPPPPPPPPPNNHKMNNONOOOLNMJNNNNNOOOOPPPPPPOL....................................ONKKMPPPPPPPPPPPPPPPPPPPPPPPPJONNOONLNMJKLMOONNOOKKLJMNOONMNNJIKMLNOONNLMNL",
  "PPPPPPPPPPOPPPPPPPPPPPPPPOLMMLLOOMOOOMMNJ..IMPPPPPPPPPPPPPPPPPNILO...ONPOLNMKNOPMOPONOLOPPPPPON....................OOOOMPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPLONLPNMMNOJLLMOONNOOLLNLNOPPONNNJJLMMNPONOLMOL",
  "PPPPPPPPPPPPPPPPPPPPPPOMNNKLKKLOONOOO........ONNOKJPPPPPPPPPPPPPPNOO..OOOLNMJOOONOONNNJNLMPPPPON..............MNLPPPPPPPPPPPPPPPPPPPPPPPPPPPJPPPPPPPPPPPPPPPPPPKONMOOONNNKLLMOOONOOLLMJNOOONMNOJILMLNOOOOMMOM",
  "PPPPPPPPPPPPPPPPPJPNNPPPOOMLMLLOOOP.............PKLKLNPPPPPPPPPPPPPPONPNOLNNJ.OOMOPOPNKNMLPPPPPPOO......OONPPPPPPPPPPPPMMNJJNOOOPPPPPPPPPPONOPPPPPPPPPPPPPPPPLKKPONPPPOMNKMLMPOPOOOMMMLNPOOPNNOJJLNNOOONPMMPM",
  "PPPPPPPPOOOOOMNLIJONMOOOONLMMLLOON...................MNOOOOMNPPPPPPPPPPOOKMMJ..NNOPOOOJNLLOOOPPPPPO....OPPPPPPKKLNOOOOOMMMJIMNNOOOOPPPNKNOPPPPPPPPPPPPPPPPOMLKJKOONOOONMMJMLMONOOOOLLMKNOOPONNOKJKMLOOOOOMNOM",
  "PPPPPPNNONOPONOMJINNNPPPPOMMLLLN...........................MNONPPPPPPPPPPMNMK...NOPOPNLNMMF.HNNPPPPO...OOPONOKMLMNN..............OOOLLNLPPPPPPPPPJMPNMPPOPONMLLKPOOPPONNNK.......DPLMMKNOPOPNOPKJMOMOOOPPMNPM",
  "PPPPPMMOOOOOONPMJJNMMOOOPOLMMK.................................ILNNOPPPPPPPPOO...PPPPOKNMME...NMOMLK...............................CMLPPPPPPPPPPOJNONMPPOOONMLKKPONPOPMM.....................................",
  "PPOKLMMOONOOONMMJKOOMOPPONL.......................................MNNOOOOPPPPPLLCPPPOOKNMMPD......................................NPPPPPPPPPOOMONJNPMMPPOPONMLKLPNOPPN.......................................",
  "PPPKMMLOOOOOOONNKJOOOPPPO...........................................OPPPPNPPPPOP.PPOPOJOMMOD....................................NPPPPPPPPOOOPOOPNINPMNPPPPNNMMMLPOOP.........................................",
  "PNNJLLMOOOONOMNMJINNNO.............................................OOOONOLPPPPPO.COOPOKNMMNN..................................MOPPPPPPPLNMOONOOOMINOMMOOOPOMLKKL.............................................",
  "OPOKMMNOPPOOONNNJIN.................................................OPPP....OO.....PPOJKDPP..................................OPPPPPPMLOMOOPOOPOPNKNPNMPPPPON.................................................",
  "MONJJLMNNNOOOMMM.............................................................................................................OPPPPNNKMMLNNNOOOOONINOM........................................................",
  "OPNJKMNOPPOOO.................................................................................................................PPOOOOKPPONPP..POOMJNOL........................................................",
  "NNNJKLMNNO.....................................................................................................................PPPNNKPPPON...OPPOIMN.........................................................",
  "OOLLLMM.......................................................................................................................PPPPPPLPPOON....NNNJOP.........................................................",
  "NNLJLE.........................................................................................................................NPPPJKPPPOO....NPPLN..........................................................",
  "M..............................................................................................................................CPPPKJPPOPO....OPPOO..........................................................",
  "................................................................................................................................PPPMKPPKNOE....OOIN..........................................................",
  ".................................................................................................................................NONKKMMNF..................................................................."
].join("");
