import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from '../component/registerPage/register-page.component';
import { LoginPageComponent } from '../component/loginPage/login-page.component.';
import { RegisterSuccessComponent } from '../component/registerSuccess/register-success.component';

const routes: Routes = [
    {
        path: '/register',
        component: RegisterPageComponent,
        children: [
            {
                path: '/success',
                component: RegisterSuccessComponent
            }
        ]
    },
    {
        path: '/login',
        component: LoginPageComponent
    },
    {
        path: '',
        redirectTo: '/login'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {}