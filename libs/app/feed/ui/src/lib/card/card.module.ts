import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card.component';
import { NgxsModule } from '@ngxs/store';
import { FeedState } from '@mp/app/feed/data-access';

@NgModule({
    declarations: [CardComponent],
    imports: [
        CommonModule,
        IonicModule,
        NgxsModule.forFeature([FeedState]),
    ],
    exports: [CardComponent]
})
export class CardModule {

}