import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComponentModule } from './component/component.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterPageComponent } from './component/registerPage/register-page.component';
import { LoginPageComponent } from './component/loginPage/login-page.component.';
import { RoutingModule } from './routing/routing.module';
import { RegisterSuccessComponent } from './component/registerSuccess/register-success.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ComponentModule,
    FormsModule,
    /*RouterModule.forRoot([
      {path: '', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'register/success', component: RegisterSuccessComponent},
      {path: 'login', component: LoginPageComponent}
    ]),*/
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
