import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from '../component/registerPage/register-page.component';
import { LoginPageComponent } from '../component/loginPage/login-page.component.';
import { RegisterSuccessComponent } from '../component/registerSuccess/register-success.component';
import { LoggedInGuard } from './loggedInGuard';
import { PostsPageComponent } from '../component/postsPage/posts-page.component';
import { AuthenticationService } from '../common/authentication/authentication.service';
import { RegisterSuccessGuard } from './registerSuccessGuard';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterPageComponent,
    },
    {
        path: 'registersuccess',
        canActivate: [RegisterSuccessGuard],
        component: RegisterSuccessComponent
    },
    {
        path: 'login',
        component: LoginPageComponent
    },
    {
        path: '',
        canActivate: [LoggedInGuard],
        component: PostsPageComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule],
    providers: [AuthenticationService, LoggedInGuard, RegisterSuccessGuard]
})
export class RoutingModule { }

