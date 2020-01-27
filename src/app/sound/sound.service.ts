import { Injectable } from '@angular/core';
import { Note } from '../common/notes';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() {}

  private audioCtx = new (window as any).AudioContext();

  play(note: Note) {
      const oscillatorType = 'sawtooth' as any as OscillatorType
      const oscillator = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);

      oscillator.frequency.value = note.pitch;      
      oscillator.type = oscillatorType;
      
      oscillator.start();
      setTimeout(() => oscillator.stop(), note.duration);
  }
}
