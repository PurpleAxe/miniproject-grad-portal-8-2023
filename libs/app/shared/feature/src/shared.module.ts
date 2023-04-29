import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedPageComponent } from './shared.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  providers: [SharedPageComponent],
})
export class SharedModule {}
