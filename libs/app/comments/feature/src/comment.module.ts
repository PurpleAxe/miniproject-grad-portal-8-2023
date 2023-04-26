import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentPageRoutingModule } from './comment-routing.module';
import { CommentPage } from './comment.page';
import { CommentComponent,CommentModule as c} from '@mp/app/comments/ui';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CommentPageRoutingModule, c],
  declarations: [CommentPage],
  bootstrap:[CommentComponent]
})
export class CommentModule {}
