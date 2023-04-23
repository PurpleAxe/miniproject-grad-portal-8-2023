import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedPage } from './feed.page';
import { IonicModule } from '@ionic/angular';
import { FeedRouting } from './feed.routing';
import { CardComponent, FeedModule as CardModule } from '@mp/app/feed/ui';
import { FeedModule as FeedDataAccess} from '@mp/app/feed/data-access';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [CommonModule, IonicModule, FeedRouting, CardModule, NgxsModule,FeedDataAccess],
  declarations: [FeedPage],
  bootstrap:[CardComponent]
})
export class FeedModule {}