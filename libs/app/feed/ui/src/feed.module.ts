import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardModule } from './card';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CardModule,
  ],
  exports: [CardModule]
})
export class FeedModule {}