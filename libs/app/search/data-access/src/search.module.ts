import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { SearchApi } from './search.api';
import { SearchState } from './search.state';
import { AuthModule } from '@mp/app/auth/data-access';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([SearchState]), AuthModule],
  providers: [SearchApi],
})
export class SearchModule {}
