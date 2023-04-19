import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { SearchPageComponent } from './search.page';
// import { SearchPageRoutingModule } from './search-routing.module';
import { SearchModule as SearchDataAccessModule } from '@mp/app/search/data-access';

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    // IonicModule,
    SearchDataAccessModule,
    // SearchPageRoutingModule
  ],
  // declarations: [SearchPageComponent],
  // exports: [SearchPageComponent],
})
export class SearchModule {}
