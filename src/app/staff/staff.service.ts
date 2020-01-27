import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Note, notes } from '../common/notes';
import { PlayerService } from '../player/player.service';
import { StaffLine } from './staff.component';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private isFullStaff$ = new Subject<void>();
  private newNote$ = new Subject<StaffLine>();
  private notes: Note[] = [];
  private pendingNotes: Note[] = [];
  private activeStaff: { staff: StaffLine[], maxNotes: number };

  constructor(private playerService: PlayerService) {
    playerService.getNotes().subscribe(note => this.addNote(note));
  }

  private addNote(note: Note) {
    this.notes.push(note);

    const line = this.activeStaff.staff.find(line => line.note.name === note.name);
    const ledgerAdjacentLines = this.getLedgerAdjacentLines(line);
    const otherLines = this.getOtherLines(line, ledgerAdjacentLines);

    line.notes.push(true);
    ledgerAdjacentLines.forEach(ledger => ledger.notes.push('ledger'));
    otherLines.forEach(other => other.notes.push(false));

    this.newNote$.next(line);

    if (this.isFull()) {
      this.isFullStaff$.next();
    }
  }

  private getOtherLines(line: StaffLine, ledgerAdjacentLines: StaffLine[]): StaffLine[] {
    return this.activeStaff.staff.filter(other => other != line && !ledgerAdjacentLines.includes(other));
  }

  private getLedgerAdjacentLines(line: StaffLine) : StaffLine[] {
    if (line.note.trebleClef === 'lower-ledger-line') {
      return this.activeStaff.staff.filter(l => l.note.trebleClef === 'lower-ledger-line' && 
                                                notes.indexOf(l.note) < notes.indexOf(line.note));
    }
    
    if (line.note.trebleClef === 'upper-ledger-line') {
      return this.activeStaff.staff.filter(l => l.note.trebleClef === 'upper-ledger-line' && 
                                                notes.indexOf(l.note) > notes.indexOf(line.note));
    }

    return [];
  }

  private isFull(): boolean {
    return this.activeStaff.staff.some(line => line.notes.length >= this.activeStaff.maxNotes);
  }

  registerStaff(staff: StaffLine[], maxNotes: number): Observable<StaffLine> {
    this.activeStaff = { staff, maxNotes };
    this.addPendingNotes();
    return this.newNote$.asObservable();
  }

  isFullStaff() {
    return this.isFullStaff$.asObservable();
  }

  completeStaff() {
    this.isFullStaff$.next();
  }

  rebuildStaves() {
    this.pendingNotes = this.notes.splice(0, this.notes.length);
    if (this.playerService.isPlaying()) {
      this.playerService.stop();
      this.addPendingNotes();
      this.playerService.play();
    } else {
      this.addPendingNotes();
    }
  }

  private addPendingNotes() {
    for (const note of [ ...this.pendingNotes ]) {
      this.addNote(note);
      this.pendingNotes.splice(0, 1);

      if (this.isFull()) {
        return;
      }
    }
  }

}
