import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPageComponent } from './forgot.page';

const routes: Routes = [
    {
        path: '',
        component: ForgotPageComponent
    },
    {
        path: 'forgot',
        loadChildren: () =>
            import('./forgot.module').then((m) => m.ForgotModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ForgotPageRoutingModule { }