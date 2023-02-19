import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";


@Component({
    selector: 'navbar-component',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnChanges { 
    @Input() isLoggedIn: boolean = false;

    ngOnChanges(changes: SimpleChanges){
        alert('navbar on changes');
        alert(changes['isLoggedIn'].currentValue);    
        this.isLoggedIn = changes['isLoggedIn'].currentValue;
    }
}