import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForgotPageRoutingModule } from './forgot-routing.module';
import { ForgotPageComponent } from './forgot.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ForgotPageRoutingModule
    ],
    declarations: [ForgotPageComponent],
    exports: [ForgotPageComponent],
})
export class ForgotModule { }
