import { Component } from '@angular/core';
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
      this.isUserLoggedIn = true;
    }
  }


}
