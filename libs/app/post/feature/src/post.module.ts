import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostRouting} from './post.routing';
import { PostPageComponent } from './post.page';
import { PostState, PostApi } from '@mp/app/post/data-access';
import { ProfileState } from '@mp/app/profile/data-access';


import { NgxsModule } from '@ngxs/store';



@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PostRouting, NgxsModule.forFeature([PostState, ProfileState])],
  declarations: [PostPageComponent],
  providers: [PostApi],
  exports: [PostPageComponent],
})
export class PostModule {}