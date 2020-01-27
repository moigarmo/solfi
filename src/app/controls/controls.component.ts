import { Component, OnInit, Input, HostListener } from '@angular/core';
import { PlayerService } from '../player/player.service';
import { Note, notes } from '../common/notes';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  isPlaying: boolean;
  canPlay: boolean;

  constructor(private playerService: PlayerService,
              private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getOptions().subscribe(opts => {
      this.canPlay = opts.selectedNotes.length && opts.bpm > 0;
      if (!this.canPlay && this.isPlaying) {
        this.stop();
      }
    });

    this.menuService.getMenuState().subscribe(opened => {
      if(opened && this.isPlaying) {
        this.stop();
      }
    });
  }

  @HostListener('window:keyup.space')
  togglePlay() {
    this.isPlaying ? this.stop() : this.play();
  }

  play() {
    if (!this.canPlay) {
      return;
    }

    this.menuService.setMenuState(false);
    this.isPlaying = true;
    this.playerService.play();
  }

  stop() {
    this.isPlaying = false;
    this.playerService.stop();
  }
}
