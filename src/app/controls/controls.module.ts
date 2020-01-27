import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlsComponent } from './controls.component';
import { SoundModule } from '../sound/sound.module';
import { PlayerModule } from '../player/player.module';

@NgModule({
  declarations: [ControlsComponent],
  imports: [
    CommonModule,
    SoundModule,
    PlayerModule
  ],
  exports: [ ControlsComponent ]
})
export class ControlsModule { }
