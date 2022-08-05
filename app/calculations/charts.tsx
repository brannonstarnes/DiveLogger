// TODO: Commented out are Decompression Tables. Once No-Deco is complete, will finish Deco tables.

// const thirtyDeco380 = {
//     deco: true,
//     desig: "Z",
//     stop20fsw: "YES",
//     air20fsw: ":05",
//     oxy20fsw: ":01",
//     periods: ".05",
//   };
//   const thirtyDeco420 = {
//     deco: true,
//     desig: "Z",
//     stop20fsw: "YES",
//     air20fsw: ":22",
//     oxy20fsw: ":05",
//     periods: ".05",
//   };
//   const thirtyDeco480 = {
//     deco: true,
//     desig: "Z",
//     stop20fsw: "YES",
//     air20fsw: ":42",
//     oxy20fsw: ":09",
//     periods: ".05",
//   };
//   const thirtyDeco540 = {
//     deco: true,
//     desig: "Z",
//     stop20fsw: "YES",
//     air20fsw: ":71",
//     oxy20fsw: ":14",
//     periods: "1",
//   };
//   const thirtyDeco600 = {
//     deco: true,
//     desig: "Z",
//     stop20fsw: "YES",
//     air20fsw: ":92",
//     oxy20fsw: ":19",
//     periods: "1",
//   };
//   const thirtyDeco660 = {
//     deco: true,
//     desig: "Z",
//     stop20fsw: "YES",
//     air20fsw: ":120",
//     oxy20fsw: ":22",
//     periods: "1",
//   };
//   const thirtyDeco720 = {
//     deco: true,
//     desig: "Z",
//     stop20fsw: "YES",
//     air20fsw: ":158",
//     oxy20fsw: ":27",
//     periods: "1",
//   };

const noD10 = {
  57: "A",
  101: "B",
  158: "C",
  245: "D",
  426: "E",
  Unlimited: "F",
};
const noD15 = {
  36: "A",
  60: "B",
  88: "C",
  121: "D",
  163: "E",
  217: "F",
  297: "G",
  449: "H",
  Unlimited: "I",
};
const noD20 = {
  26: "A",
  43: "B",
  61: "C",
  82: "D",
  106: "E",
  133: "F",
  165: "G",
  205: "H",
  256: "I",
  330: "J",
  461: "K",
  Unlimited: "L",
};
const noD25 = {
  20: "A",
  33: "B",
  47: "C",
  62: "D",
  78: "E",
  97: "F",
  117: "G",
  140: "H",
  166: "I",
  198: "J",
  236: "K",
  285: "L",
  354: "M",
  469: "N",
  992: "O",
  1102: "Z",
};
const noD30 = {
  17: "A",
  27: "B",
  38: "C",
  50: "D",
  62: "E",
  76: "F",
  91: "G",
  107: "H",
  125: "I",
  145: "J",
  167: "K",
  193: "L",
  223: "M",
  260: "N",
  307: "O",
  371: "Z",
  // 380: thirtyDeco380,
  // 420: thirtyDeco420,
  // 480: thirtyDeco480,
  // 540: thirtyDeco540,
  // 600: thirtyDeco600,
  // 660: thirtyDeco660,
  // 720: thirtyDeco720,
};

const noD35 = {
  14: "A",
  23: "B",
  32: "C",
  42: "D",
  52: "E",
  63: "F",
  74: "G",
  87: "H",
  100: "I",
  115: "J",
  131: "K",
  148: "L",
  168: "M",
  190: "N",
  215: "O",
  232: "Z",
  240: "Z Decompression Stop! 20fsw - AIR :4 / O2 :02  SURD O2 Period: 0.5",
  270: "Z Decompression Stop! 20fsw - AIR :28 / O2 :07 / RECOMMEND SURD O2 Period: 0.5",
  300: "Z Decompression Stop! 20fsw - AIR :53 / O2 :13 / RECOMMEND SURD O2 Period: 0.5",
  330: "Z Decompression Stop! 20fsw - AIR :71 / O2 :18 / RECOMMEND SURD O2 Period: 1",
  360: "__ Decompression Stop! 20fsw - AIR :88 / O2 :22 / RECOMMEND SURD O2 Period  1",
  420: "__ EXCEPTIONAL EXPOSURE- In-Water O2 or SURD REQUIRED! 20fsw - AIR :134  / O2 :29 / SURD O2 Periods:  1.5",
  480: "__ EXCEPTIONAL EXPOSURE- In-Water O2 or SURD REQUIRED! 20fsw - AIR :173  / O2 :38 / SURD O2 Periods:  1.5",
  540: "__ EXCEPTIONAL EXPOSURE- In-Water O2 or SURD REQUIRED! 20fsw - AIR :228  / O2 :45 / SURD O2 Periods:  2",
  600: "__ EXCEPTIONAL EXPOSURE- In-Water O2 or SURD REQUIRED! 20fsw - AIR :277  / O2 :53 / SURD O2 Periods:  2",
  660: "__ EXCEPTIONAL EXPOSURE- In-Water O2 or SURD REQUIRED! 20fsw - AIR :314  / O2 :63 / SURD O2 Periods:  2.5",
  720: "__ EXCEPTIONAL EXPOSURE- In-Water O2 or SURD REQUIRED! 20fsw - AIR :342  / O2 :71 / SURD O2 Periods:  3",
};
const noD40 = {
  12: "A",
  20: "B",
  27: "C",
  36: "D",
  44: "E",
  53: "F",
  63: "G",
  73: "H",
  84: "I",
  95: "J",
  108: "K",
  121: "L",
  135: "M",
  151: "N",
  163: "O",
  170: "O Decompression Stop! 20fsw - AIR :06 / O2 :02 SURD O2 Period: 0.5",
  180: "Z Decompression Stop! 20fsw - AIR :14 / O2 :05 SURD O2 Period: 0.5",
  190: "Z Decompression Stop! 20fsw - AIR :21 / O2 :07 / SURD O2 Period: 0.5",
  200: "Z Decompression Stop! 20fsw - AIR :27 / O2 :09 / SURD O2 Period: 0.5",
  210: "Z Decompression Stop! 20fsw - AIR :39 / O2 :11 / SURD O2 Period: 0.5",
  220: "Z Decompression Stop! 20fsw - AIR :52 / O2 :12 / SURD O2 Period: 0.5",
  230: "Z Decompression Stop! 20fsw - AIR :64 / O2 :16 / SURD O2 Period: 1",
  240: "Z Decompression Stop! 20fsw - AIR :75 / O2 :19 / SURD O2 Period: 1",
  270: "Z (EXCEPTIONAL EXPOSURE) In-Water O2 or SURD REQUIRED! 20fsw - AIR :101 / O2 :26 / SURD O2 Period: 1",
  300: "__(EXCEPTIONAL EXPOSURE) In-Water O2 or SURD REQUIRED! 20fsw - AIR :128 / O2 :33 / SURD O2 Periods: 1.5",
  330: "__(EXCEPTIONAL EXPOSURE) In-Water O2 or SURD REQUIRED! 20fsw - AIR :160 / O2 :38 / SURD O2 Periods: 1.5",
  360: "__(EXCEPTIONAL EXPOSURE) In-Water O2 or SURD REQUIRED! 20fsw - AIR :184 / O2 :44 / SURD O2 Periods: 2",
  420: "__(EXCEPTIONAL EXPOSURE) In-Water O2 or SURD REQUIRED! 20fsw - AIR :248 / O2 :56 / SURD O2 Periods: 2.5",
  480: "__(EXCEPTIONAL EXPOSURE) In-Water O2 or SURD REQUIRED! 20fsw - AIR :321 / O2 :68 / SURD O2 Periods: 2.5",
  540: "__(EXCEPTIONAL EXPOSURE) SURD REQUIRED! 20fsw - AIR :372 / O2 :80 / SURD O2 Periods: 3",
  600: "__(EXCEPTIONAL EXPOSURE) SURD REQUIRED! 20fsw - AIR :410 / O2 :93 / SURD O2 Periods: 3.5",
  660: "__(EXCEPTIONAL EXPOSURE) SURD REQUIRED! 20fsw - AIR :439 / O2 :103 / SURD O2 Periods: 4",
  720: "__(EXCEPTIONAL EXPOSURE) SURD REQUIRED! 20fsw - AIR :461 / O2 :112 / SURD O2 Periods: 4.5",
};
const noD45 = {
  11: "A",
  17: "B",
  24: "C",
  31: "D",
  39: "E",
  46: "F",
  55: "G",
  63: "H",
  72: "I",
  82: "J",
  92: "K",
  102: "L",
  114: "M",
  125: "N",
  WARNING: "Decompression Required!",
};
const noD50 = {
  9: "A",
  15: "B",
  21: "C",
  28: "D",
  34: "E",
  41: "F",
  48: "G",
  56: "H",
  63: "I",
  71: "J",
  80: "K",
  89: "L",
  92: "M",
  WARNING: "Decompression Required!",
};
const noD55 = {
  8: "A",
  14: "B",
  19: "C",
  25: "D",
  31: "E",
  37: "F",
  43: "G",
  50: "H",
  56: "I",
  63: "J",
  71: "K",
  74: "L",
  WARNING: "Decompression Required!",
};
const noD60 = {
  7: "A",
  12: "B",
  17: "C",
  22: "D",
  28: "E",
  33: "F",
  39: "G",
  45: "H",
  51: "I",
  57: "J",
  63: "K",
  WARNING: "Decompression Required!",
};
const noD70 = {
  6: "A",
  10: "B",
  14: "C",
  19: "D",
  23: "E",
  28: "F",
  32: "G",
  37: "H",
  42: "I",
  47: "J",
  48: "K",
  WARNING: "Decompression Required!",
};
const noD80 = {
  5: "A",
  9: "B",
  12: "C",
  16: "D",
  20: "E",
  24: "F",
  28: "G",
  32: "H",
  36: "I",
  39: "J",
  WARNING: "Decompression Required!",
};
const noD90 = {
  4: "A",
  7: "B",
  11: "C",
  14: "D",
  17: "E",
  21: "F",
  24: "G",
  28: "H",
  31: "I",
  33: "J",
  WARNING: "Decompression Required!",
};
const noD100 = {
  4: "A",
  6: "B",
  9: "C",
  12: "D",
  15: "E",
  18: "F",
  21: "G",
  25: "H",
  WARNING: "Decompression Required!",
};
const noD110 = {
  3: "A",
  6: "B",
  8: "C",
  11: "D",
  14: "E",
  16: "F",
  19: "G",
  20: "H",
  WARNING: "Decompression Required!",
};
const noD120 = {
  3: "A",
  5: "B",
  7: "C",
  10: "D",
  12: "E",
  15: "F",
  WARNING: "Decompression Required!",
};
const noD130 = {
  2: "A",
  4: "B",
  6: "C",
  9: "D",
  11: "E",
  12: "F",
  WARNING: "Decompression Required!",
};
const noD140 = {
  2: "A",
  4: "B",
  6: "C",
  8: "D",
  10: "E",
  WARNING: "Decompression Required!",
};
const noD150 = {
  3: "B",
  5: "C",
  7: "D",
  8: "E",
  WARNING: "Decompression Required!",
};
const noD160 = {
  3: "B",
  5: "C",
  6: "D",
  7: "E",
  WARNING: "Decompression Required!",
};
const noD170 = {
  4: "C",
  6: "D",
  WARNING: "Decompression Required!",
};
const noD180 = {
  4: "C",
  5: "D",
  6: "E",
  WARNING: "Decompression Required!",
};
const noD190 = {
  3: "C",
  5: "D",
  WARNING: "Decompression Required!",
};

export const chartMap = new Map();
chartMap.set(10, noD10);
chartMap.set(15, noD15);
chartMap.set(20, noD20);
chartMap.set(25, noD25);
chartMap.set(30, noD30);
chartMap.set(35, noD35);
chartMap.set(40, noD40);
chartMap.set(45, noD45);
chartMap.set(50, noD50);
chartMap.set(55, noD55);
chartMap.set(60, noD60);
chartMap.set(70, noD70);
chartMap.set(80, noD80);
chartMap.set(90, noD90);
chartMap.set(100, noD100);
chartMap.set(110, noD110);
chartMap.set(120, noD120);
chartMap.set(130, noD130);
chartMap.set(140, noD140);
chartMap.set(150, noD150);
chartMap.set(160, noD160);
chartMap.set(170, noD170);
chartMap.set(180, noD180);
chartMap.set(190, noD190);

export default chartMap;
