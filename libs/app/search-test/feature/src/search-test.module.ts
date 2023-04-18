import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchTestModule as SearchTestDataAccessModule } from '@mp/app/search-test/data-access';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SearchTestPage } from './search-test.page';
import { SearchTestRouting } from './search-test.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SearchTestDataAccessModule,
    // NgxsFormPluginModule,
    FormsModule,
    SearchTestRouting,
  ],
  declarations: [SearchTestPage],
})
export class SearchTestModule {}
