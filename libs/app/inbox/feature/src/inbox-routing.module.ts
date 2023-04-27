import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxPageComponent } from './inbox.page';

const routes: Routes = [
  {
    path: '',
    component: InboxPageComponent,
  },
  {
    path: 'chats/:id',
    loadChildren: () =>
      import('@mp/app/chat/feature').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxPageRoutingModule {}
