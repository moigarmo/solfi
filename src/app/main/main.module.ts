import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MenuModule } from '../menu/menu.module';
import { StaffModule } from '../staff/staff.module';
import { ControlsModule } from '../controls/controls.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MenuModule,
    StaffModule,
    ControlsModule
  ]
})
export class MainModule { }
