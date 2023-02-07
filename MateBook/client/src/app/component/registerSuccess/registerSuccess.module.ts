import { NgModule } from '@angular/core';
import { RoutingModule } from 'src/app/routing/routing.module';
import { RegisterSuccessComponent } from './register-success.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [RegisterSuccessComponent],
    imports: [RoutingModule, RouterModule],
    exports: [RegisterSuccessComponent]
})
export class RegisterSuccessModule {}