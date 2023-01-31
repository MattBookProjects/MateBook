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
  constructor(private loginService: LoginService) {
   
  }

  login(): void {
    if (this.username === '' || this.password === '') {

    }
    else {
      this.loginService.login(this.username, this.password)
    }
  }
}
