import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostRouting} from './post.routing';
import { PostPageComponent } from './post.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PostRouting],
  declarations: [PostPageComponent],
  exports: [PostPageComponent],
})
export class PostModule {}