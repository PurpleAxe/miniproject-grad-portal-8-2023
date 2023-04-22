import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostRouting } from './post.routing';
import { PostPageComponent } from './post.page';
import { NgxsModule } from '@ngxs/store';
import { PostState } from '@mp/app/post/data-access';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PostRouting, NgxsModule.forFeature([PostState])],
  declarations: [PostPageComponent],
})
export class PostModule {}
