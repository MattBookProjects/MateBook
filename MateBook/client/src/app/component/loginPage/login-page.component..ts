import { Component } from '@angular/core';
import { LoginService } from 'src/app/common/login/login.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;
    constructor(private loginService: LoginService) {
   
    }

  async login(){
    if (this.username === '' ) {
      this.error = "Username is required"
    } else if (this.password === '') {
      this.error = "Password is required"
    } else {
      this.error = null;
      let err = await this.loginService.login(this.username, this.password);
      if (err){
        this.error = err;
      }
   
    }
  }
}
