export type NoteZone = 'upper-ledger-line' | 'staff-line-half-top' | 'staff-line-half-bottom' | 'lower-ledger-line'; 

export type Note = {
  type: 'line' | 'blank';
  trebleClef: NoteZone;
  bassClef: NoteZone;
  name: string;
  pitch: number;
  duration?: number;
}

export const notes: Note[] = [
  {
    type: 'line',
    name: 'B6',
    pitch: 1975.53,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'blank',
    name: 'A6',
    pitch: 1760.00,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'line',
    name: 'G6',
    pitch: 1567.98,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'blank',
    name: 'F6',
    pitch: 1396.91,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'line',
    name: 'E6',
    pitch: 1318.51,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'blank',
    name: 'D6',
    pitch: 1174.66,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'line',
    name: 'C6',
    pitch: 1046.50,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'blank',
    name: 'B5',
    pitch: 987.77,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'line',
    name: 'A5',
    pitch: 880.00,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'blank',
    name: 'G5',
    pitch: 783.99,
    trebleClef: 'upper-ledger-line',
    bassClef: "upper-ledger-line"
  },
  {
    type: 'line',
    name: 'F5',
    pitch: 698.46,
    trebleClef: 'staff-line-half-top',
    bassClef: "upper-ledger-line"
  }, {
    type: 'blank',
    name: 'E5',
    pitch: 659.26,
    trebleClef: 'staff-line-half-top',
    bassClef: "upper-ledger-line"
  }, {
    type: 'line',
    name: 'D5',
    pitch: 587.33,
    trebleClef: 'staff-line-half-top',
    bassClef: "upper-ledger-line"
  }, {
    type: 'blank',
    name: 'C5',
    pitch: 523.25,
    trebleClef: 'staff-line-half-top',
    bassClef: "upper-ledger-line"
  }, {
    type: 'line',
    name: 'B4',
    pitch: 493.88,
    trebleClef: 'staff-line-half-top',
    bassClef: "upper-ledger-line"
  }, {
    type: 'blank',
    name: 'A4',
    pitch: 440.00,
    trebleClef: 'staff-line-half-bottom',
    bassClef: "upper-ledger-line"
  }, {
    type: 'line',
    name: 'G4',
    pitch: 392.00,
    trebleClef: 'staff-line-half-bottom',
    bassClef: "upper-ledger-line"
  }, {
    type: 'blank',
    name: 'F4',
    pitch: 349.23,
    trebleClef: 'staff-line-half-bottom',
    bassClef: "upper-ledger-line"
  }, {
    type: 'line',
    name: 'E4',
    pitch: 329.63,
    trebleClef: 'staff-line-half-bottom',
    bassClef: "upper-ledger-line"
  }, {
    type: 'blank',
    name: 'D4',
    pitch: 293.66,
    trebleClef: 'lower-ledger-line',
    bassClef: "upper-ledger-line"
  }, {
    type: 'line',
    name: 'C4',
    pitch: 261.63,
    trebleClef: 'lower-ledger-line',
    bassClef: "upper-ledger-line"
  }, {
    type: 'blank',
    name: 'B3',
    pitch: 246.94,
    trebleClef: 'lower-ledger-line',
    bassClef: "upper-ledger-line"
  }, {
    type: 'line',
    name: 'A3',
    pitch: 220.00,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-top"
  }, {
    type: 'blank',
    name: 'G3',
    pitch: 196.00,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-top"
  }, {
    type: 'line',
    name: 'F3',
    pitch: 174.61,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-top"
  }, {
    type: 'blank',
    name: 'E3',
    pitch: 164.81,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-top"
  }, {
    type: 'line',
    name: 'D3',
    pitch: 146.83,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-top"
  }, {
    type: 'blank',
    name: 'C3',
    pitch: 130.81,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-bottom"
  }, {
    type: 'line',
    name: 'B2',
    pitch: 123.47,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-bottom"
  }, {
    type: 'blank',
    name: 'A2',
    pitch: 110.00,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-bottom"
  }, {
    type: 'line',
    name: 'G2',
    pitch: 97.999,
    trebleClef: 'lower-ledger-line',
    bassClef: "staff-line-half-bottom"
  }, {
    type: 'blank',
    name: 'F2',
    pitch: 87.307,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  },  {
    type: 'line',
    name: 'E2',
    pitch: 82.407,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }, {
    type: 'blank',
    name: 'D2',
    pitch: 73.416,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }, {
    type: 'line',
    name: 'C2',
    pitch: 65.406,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }, {
    type: 'blank',
    name: 'B1',
    pitch: 61.7354,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }, {
    type: 'line',
    name: 'A1',
    pitch: 55,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }, {
    type: 'blank',
    name: 'G1',
    pitch: 48.9995,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }, {
    type: 'line',
    name: 'F1',
    pitch: 43.6536,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }, {
    type: 'blank',
    name: 'E1',
    pitch: 41.2035,
    trebleClef: 'lower-ledger-line',
    bassClef: "lower-ledger-line"
  }
];
