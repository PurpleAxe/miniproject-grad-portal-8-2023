import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SearchTestState } from './search-test.state';
import { AuthModule } from '@mp/app/auth/data-access';
import { SearchModule } from '@mp/app/search/data-access';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([SearchTestState]),
    SearchModule,
    AuthModule,
  ],
})
export class SearchTestModule {}
