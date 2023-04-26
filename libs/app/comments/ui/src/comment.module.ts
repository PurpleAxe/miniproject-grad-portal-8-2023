import { CommentComponent } from './comment/comment.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [CommentComponent],
  exports: [CommentComponent]
})
export class CommentModule {}
