import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchTestPage } from './search-test.page';

const routes: Routes = [
  //TODO: update routes
  {
    path: '',
    pathMatch: 'full',
    component: SearchTestPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTestRouting {}
