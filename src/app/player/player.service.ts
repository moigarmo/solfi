import { Injectable } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';
import { Note, notes } from '../common/notes';
import { MenuService } from '../menu/menu.service';
import { SoundService } from '../sound/sound.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private stop$ = new Subject<void>();
  private notes$ = new Subject<Note>();
  private playing: boolean;

  private bpm: number;
  private notesToPlay: Note[];
  private enableSound: boolean;

  constructor(private menuService: MenuService, 
              private soundService: SoundService) { 

    this.menuService.getOptions().subscribe(opts => {
      const newNotesToPlay = opts.selectedNotes.map(name => notes.find(note => note.name === name));
      const newBpm = opts.bpm;

      const restart = this.mustRestart(newNotesToPlay, newBpm);
      
      this.notesToPlay = newNotesToPlay;
      this.bpm = newBpm;
      this.enableSound = opts.enableSound;

      if(restart) {
        this.stop();
        this.play();
      }
    });              
  }

  private mustRestart(newNotesToPlay: Note[], newBpm: number): boolean {    
    return this.isPlaying() && 
        (this.notesChanged(newNotesToPlay) || this.bpm != newBpm);
  }

  private notesChanged(newNotesToPlay: Note[]): boolean {
    return newNotesToPlay.length != this.notesToPlay.length ||
           newNotesToPlay.filter(note => !this.notesToPlay.includes(note)).length > 0
  }

  play() {
    if (!this.isValid()) {
      return;
    }

    const duration = 60 * 1000 / this.bpm;

    this.playing = true;

    timer(0, duration)
      .pipe(takeUntil(this.stop$))
      .subscribe(() => this.playNote({ ...this.random(this.notesToPlay), duration }));
  }

  private isValid(): boolean {
    return this.bpm > 0 && this.notesToPlay.length > 0;
  }

  private playNote(note: Note) {
    this.notes$.next(note);
    if (this.enableSound) {
      this.soundService.play(note);
    }
  }

  stop() {
    this.playing = false;
    this.stop$.next();
  }

  isPlaying(): boolean {
    return this.playing;
  }

  getNotes(): Observable<Note> {
    return this.notes$.asObservable();
  }

  private random(notes: Note[]): Note {
    return notes[Math.floor(Math.random() * notes.length)];
  }
}
