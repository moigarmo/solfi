export type StaffMode = 'treble' | 'bass' | 'whole';

export interface Options {
    bpm: number;
    selectedNotes: string[];
    enableSound: boolean;
    staffMode: StaffMode;
}
  