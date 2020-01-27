import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerModule } from '../player/player.module';
import { StaffComponent } from './staff.component';

@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    CommonModule,
    PlayerModule
  ],
  exports: [ 
    StaffComponent
  ]
})
export class StaffModule { }
