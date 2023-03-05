import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NO_ERRORS_SCHEMA, SimpleChange, SimpleChanges } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { UserControlModule } from "../userControl/user-control.module";
import { NavbarComponent } from "./navbar.component";


describe('Tests for navbar component', () => {
    describe('Class tests', () => {
        beforeAll(() => {
            TestBed.configureTestingModule({imports: [CommonModule], declarations: [NavbarComponent], schemas: [NO_ERRORS_SCHEMA]})
        })
        it('isLoggedIn to be false after creation', () => {
            const fixture = TestBed.createComponent(NavbarComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.isLoggedIn).toBe(false);
        });
        it('isLoggedIn to be true after ngOnChanges with true', () => {
            const fixture = TestBed.createComponent(NavbarComponent);
            fixture.detectChanges();
            fixture.componentInstance.ngOnChanges({isLoggedIn: new SimpleChange(false, true, true)});
            expect(fixture.componentInstance.isLoggedIn).toBe(true);
        });
        it('isLoggedIn to be false after ngOnChanges with false', () => {
            const fixture = TestBed.createComponent(NavbarComponent);
            fixture.detectChanges();
            fixture.componentInstance.ngOnChanges({isLoggedIn: new SimpleChange(false, true, true)});
            fixture.detectChanges();
            fixture.componentInstance.ngOnChanges({isLoggedIn: new SimpleChange(true, false, false)});
            fixture.detectChanges();
            expect(fixture.componentInstance.isLoggedIn).toBe(false);
        });
    });
    describe('DOM element tests', () => {
        let mockHttpClient = {} as unknown as HttpClient;
        beforeAll(() => {
            TestBed.configureTestingModule({imports: [CommonModule], declarations: [NavbarComponent], schemas: [NO_ERRORS_SCHEMA]})
        })
        it('User control element to not be shown after component creation', () => {
            const fixture = TestBed.createComponent(NavbarComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('user-control')).toBe(null);
        });
      /*  it('User control element to be shown after ngOnChanges with true', () => {
            const fixture = TestBed.createComponent(NavbarComponent);
            fixture.detectChanges();
            fixture.componentInstance.ngOnChanges({isLoggedIn: new SimpleChange(false, true, false)});
            //fixture.componentInstance.isLoggedIn = true;
            fixture.detectChanges();
            //alert('after detect changes');
            //alert('INNER HTML: ' + fixture.nativeElement.querySelector('.navbar-container').innerHTML);
            expect(fixture.componentInstance.isLoggedIn).toBe(true);
            expect(fixture.nativeElement.querySelector('#user-control')).not.toBe(null); 
        });*/
        it('User control element to be shown after ngOnChanges with false', () => {
            const fixture = TestBed.createComponent(NavbarComponent);
            fixture.detectChanges();
            fixture.componentInstance.ngOnChanges({isLoggedIn: new SimpleChange(false, true, true)});
            fixture.detectChanges();
            fixture.componentInstance.ngOnChanges({isLoggedIn: new SimpleChange(true, false, false)});
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('user-control')).toBe(null);
        })
    })
})