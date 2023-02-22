import { Component } from '@angular/core';
import { LoginPageComponent } from './component/loginPage/login-page.component.';
import { PostsPageComponent } from './component/postsPage/posts-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MateBook';
  isUserLoggedIn: boolean = false;
  
  constructor () {}

  onRouterActivate(componentRef: any){
    
    if(componentRef instanceof PostsPageComponent){
      alert('inside if app component');
      this.isUserLoggedIn = true;
    }
    else if(componentRef instanceof LoginPageComponent){
      this.isUserLoggedIn = false;
    }
  }


}
