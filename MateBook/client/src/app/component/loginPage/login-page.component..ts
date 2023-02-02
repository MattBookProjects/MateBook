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

  login(): void {
    if (this.username === '' ) {
      this.error = "Username is required"
    } else if (this.password === '') {
      this.error = "Password is required"
    } else {
      this.loginService.login(this.username, this.password);
      this.error = null;
    }
  }
}
