import { Component, OnInit } from '@angular/core';
import { Note, notes, NoteZone } from '../common/notes';
import { MatSelect } from '@angular/material/select';
import { MenuService } from './menu.service';
import { StaffMode } from '../common/options';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  displayNotes: Note[] = notes;
  selectedNotes: string[] = [];
  bpm: number;
  enableSound: boolean;
  staffMode: StaffMode = 'treble';
  displayStaffModes = [{
    id: 'treble',
    label : 'Treble Clef'
  }, {
    id: 'bass',
    label : 'Bass Clef'
  }, {
    id: 'whole',
    label : 'Treble & Bass Clef'
  }]

  isShown = true;

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenuState().subscribe(opened => this.isShown = opened);
  }

  toggleSelection(notesSelect: MatSelect, clef: 'trebleClef' | 'bassClef', zones: NoteZone[]) {
    notesSelect.options.filter(opt => !opt.disabled)
                       .filter(opt => {
                          const note = this.displayNotes.find(note => note.name === opt.value);
                          return zones.includes(note[clef] as NoteZone)
                        })
                       .forEach(opt => opt.selected ? opt.deselect() : opt.select());
  }

  menuTriggerClick() {
    this.isShown = !this.isShown;
    this.menuService.setMenuState(this.isShown);
  }

  onBpmBlur() {
    if (this.bpm <= 0) {
      this.bpm = 1;
    }
    this.notifyChanges();
  }

  onSelectedNotesOpenedChange(opened: boolean) {
    if (!opened) {
      this.notifyChanges();
    } 
  }

  onEnableSoundChange(enableSound: boolean) {
    this.enableSound = enableSound;
    this.notifyChanges();
  }

  onStaffModeSelectionChange() {
    this.notifyChanges();
  }

  private notifyChanges() {
    this.menuService.setOptions({
      bpm : this.bpm,
      enableSound : this.enableSound,
      selectedNotes : this.selectedNotes || [],
      staffMode : this.staffMode
    });
  }
}
