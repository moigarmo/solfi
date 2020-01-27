import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { StaffService } from './staff.service';
import { notes, Note } from '../common/notes';
import { takeUntil } from 'rxjs/operators';

export interface StaffLine {
  note: Note;
  pos: number;
  notes?: (true | false | 'ledger')[];
}

type NoteClefType = 'trebleClef' | 'bassClef';

type ClefConfig = {
  noteClef: NoteClefType,
  clefWidth: number,
  clefHeight: number,
  clefPosX: number,
  clefPosY: number,
  clefImg: string
}

export type StaffConfig = {
  clefConfig: ClefConfig[],
  staffStartY: number,
  lineSeparation: number,
  noteSeparation: number,
  noteStartX: number,
  noteWidth: number,
  noteHeight: number,
  noteImg: string,
  noteImgReverse: string
}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  @Input()
  staffConfig: StaffConfig;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  
  private staffLines: StaffLine[];

  private ctx: CanvasRenderingContext2D;

  constructor(private el: ElementRef, private staffService: StaffService) { }

  ngOnInit() {
    this.staffLines = [];

    this.canvas.nativeElement.setAttribute('width', window.getComputedStyle(this.canvas.nativeElement).width);
    this.canvas.nativeElement.setAttribute('height', window.getComputedStyle(this.canvas.nativeElement).height);

    this.ctx = this.canvas.nativeElement.getContext('2d');

    let pos = this.staffConfig.staffStartY;

    notes.forEach(note => { 
      this.staffLines.push({ note, pos, notes: [] });
      pos = this.createLine(note, pos);
    });

    this.insertClefImage();

    this.staffService.registerStaff(this.staffLines, this.maxNotes())
      .pipe(takeUntil(this.staffService.isFullStaff()))
      .subscribe((line: StaffLine) => {
        if (this.isOutOfView()) {
          this.canvas.nativeElement.scrollIntoView();
        }
        this.drawNote(line);
      });
  }

  private drawNote(line: StaffLine) {
    const {x, y} = this.getNotePosition(line);

    const img = new Image();
    img.src = this.getNoteImage(line);
    
    img.onload = () => {
      this.ctx.drawImage(img, x, y, this.staffConfig.noteWidth, this.staffConfig.noteHeight);
      if(!this.isClefStaffNote(line.note)){
        this.drawLedgerLines(line, x)
      }
    }
  }

  private getNoteImage(line: StaffLine) : string {
    const noteClef = this.getRelativeNoteClef(line.note);
    return ['upper-ledger-line', 'staff-line-half-top'].includes(line.note[noteClef])?
      this.staffConfig.noteImgReverse : this.staffConfig.noteImg;
  }

  private getNotePosition(line: StaffLine) : {x : number, y: number} {
    const noteClef = this.getRelativeNoteClef(line.note);
    const relY = ['upper-ledger-line', 'staff-line-half-top'].includes(line.note[noteClef])? 
      this.staffConfig.lineSeparation * 2 : this.staffConfig.noteHeight - this.staffConfig.lineSeparation * 2;
    const y = line.pos - relY;
    const x = this.staffConfig.noteStartX + line.notes.length * this.staffConfig.noteSeparation;

    return {x, y};
  }

  private drawLedgerLines(line: StaffLine, x: number) {
    const noteClef = this.getRelativeNoteClef(line.note);

    this.staffLines.filter(staffLine => {
      return staffLine.note[noteClef] === line.note[noteClef] && staffLine.note.type === 'line' &&
          (line.note[noteClef] === 'lower-ledger-line' && staffLine.pos <= line.pos || 
           line.note[noteClef] === 'upper-ledger-line' && staffLine.pos >= line.pos );
    }).forEach(staffLine => {
      this.drawLine({x, y: staffLine.pos, length: this.staffConfig.noteWidth});
    });
  }

  private getRelativeNoteClef(note: Note): NoteClefType {
    const clefConfig = this.staffConfig.clefConfig;

    if(clefConfig.length == 1) {
      return clefConfig[0].noteClef;
    }

    return note.trebleClef === 'lower-ledger-line'? 'bassClef': 'trebleClef';
  }

  private insertClefImage() {
    this.staffConfig.clefConfig.forEach(clefConfig => {
      const img = new Image();
      img.src = clefConfig.clefImg;
  
      img.onload = () => this.ctx.drawImage(
        img, clefConfig.clefPosX, clefConfig.clefPosY, clefConfig.clefWidth, clefConfig.clefHeight);
    });
  }

  private createLine(note: Note, pos: number): number {   
    if(this.isStaffLineNote(note)) {
      this.drawLine({x: 0, y: pos, length: this.canvas.nativeElement.width});
    }
    return pos + this.staffConfig.lineSeparation;
  }

  private drawLine(dim : { x: number, y: number, length: number }) {
      const { x, y, length } = dim;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + length, y);      
      this.ctx.stroke();
      this.ctx.closePath();
  }

  private isStaffLineNote(note: Note) {
    return note.type === 'line' && this.isClefStaffNote(note);
  }

  private isClefStaffNote(note: Note) {
    return this.staffConfig.clefConfig.some(clefConfig =>  
      ['staff-line-half-top', 'staff-line-half-bottom'].includes(note[clefConfig.noteClef])
    );
  }

  private isOutOfView(): boolean {
    if (!this.el.nativeElement.parentElement) {
      return false;
    }
    return this.el.nativeElement.getBoundingClientRect().bottom > 
           this.el.nativeElement.parentElement.getBoundingClientRect().bottom;
  }

  private maxNotes(): number {
    return ((this.staffWidth() - this.staffConfig.noteStartX) / this.staffConfig.noteSeparation) - 3;
  }

  private staffWidth(): number {
    return parseInt(window.getComputedStyle(this.canvas.nativeElement).width);
  }
}
