import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StaffService } from '../staff/staff.service';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { MenuService } from '../menu/menu.service';
import { StaffMode } from '../common/options';
import { StaffConfig } from '../staff/staff.component';

const staffConfig = {
  staffStartY: 40,
  lineSeparation: 4,
  noteSeparation: 24,
  noteStartX: 20,
  noteWidth: 20,
  noteHeight: 39.2,
  noteImg: '/assets/icons/quarter-note.png',
  noteImgReverse: '/assets/icons/quarter-note-reverse.png'
};

const trebleClefConfig = {
  noteClef: 'trebleClef',
  clefWidth: 64,
  clefHeight: 64,
  clefPosX: -20,
  clefPosY: 65,
  clefImg: '/assets/icons/treble-clef.png'
};

const bassClefConfig = {
  noteClef: 'bassClef',
  clefWidth: 25,
  clefHeight: 25 * 1.19,
  clefPosX: 0,
  clefPosY: 127,
  clefImg: '/assets/icons/bass-clef.png'
};

const trebleStaffConfig = {
  ...staffConfig,
  clefConfig: [trebleClefConfig]
} as StaffConfig;

const bassStaffConfig = {
  ...staffConfig,
  clefConfig: [bassClefConfig] 
} as StaffConfig;

const wholeStaffConfig = {
  ...staffConfig,
  clefConfig: [trebleClefConfig, bassClefConfig]
} as StaffConfig;

const staffConfigs = {
  'treble' : trebleStaffConfig,
  'bass' : bassStaffConfig,
  'whole' : wholeStaffConfig
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  staves: boolean[] = [true];
  staffConfig: StaffConfig = trebleStaffConfig;
  
  private staffMode: StaffMode = 'treble'

  private windowWidth;

  constructor(private staffService: StaffService,
              private menuService: MenuService,
              private chDetection: ChangeDetectorRef) { }

  ngOnInit() {
    this.staffService.isFullStaff().subscribe(() => this.staves.push(true));
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .pipe(filter(_ => window.innerWidth !== this.windowWidth))
      .pipe(map(_ => this.windowWidth = window.innerWidth))
      .subscribe(_ => this.rebuildStaves());

    this.menuService.getOptions().subscribe(opts => {
      if (this.staffMode === opts.staffMode) {
        return;
      }
      this.staffMode = opts.staffMode;
      this.staffConfig = staffConfigs[this.staffMode];
      this.resetStaves();
    });
  }

  rebuildStaves() {
    this.resetStaves();
    this.staffService.rebuildStaves();
  }

  private resetStaves() {
    this.staves = [];
    this.chDetection.detectChanges();
    this.staves.push(true);
    this.chDetection.detectChanges();
  }

}
