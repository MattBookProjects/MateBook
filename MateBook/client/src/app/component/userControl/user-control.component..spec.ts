import { CommonModule } from "@angular/common";
import { TestBed } from "@angular/core/testing";
import { LogoutService } from "src/app/common/logout/logout.service";
import { UserControlComponent } from "./user-control.component";


describe('Tests for user control component', () => {
    let mockLogoutService: LogoutService;
    describe('Class tests', () => {    
        beforeEach(() => {
            mockLogoutService = {
                logOut: () => {}
            } as unknown as LogoutService;
            TestBed.configureTestingModule({declarations: [UserControlComponent], imports: [CommonModule], providers: [{provide: LogoutService, useValue: mockLogoutService}]});
        });
        it('Dropdown to not be shown on component creation', () => {
            const fixture = TestBed.createComponent(UserControlComponent);
            fixture.detectChanges();
            expect(fixture.componentInstance.dropdown).toBe(false);
        });
        it('Dropdown to be shown after toggleDropdown is called', () => {
            const fixture = TestBed.createComponent(UserControlComponent);
            fixture.detectChanges();
            fixture.componentInstance.toggleDropdown();
            fixture.detectChanges();
            expect(fixture.componentInstance.dropdown).toBe(true)
        });
        it('Dropdown to not be shown after toggleDropdown is called again', () => {
            const fixture = TestBed.createComponent(UserControlComponent);
            fixture.detectChanges();
            fixture.componentInstance.toggleDropdown();
            fixture.componentInstance.toggleDropdown();
            fixture.detectChanges();
            expect(fixture.componentInstance.dropdown).toBe(false);
        });
        it('Logout service to be called after logOut funcition is called', () => {
            spyOn(mockLogoutService, 'logOut')
            const fixture = TestBed.createComponent(UserControlComponent);
            fixture.detectChanges();
            fixture.componentInstance.logOut();
            expect(mockLogoutService.logOut).toHaveBeenCalled();
        });
    })
    describe('DOM element tests', () => {
        beforeEach(() => {
            mockLogoutService = {
                logOut: () => {}
            } as unknown as LogoutService;
            TestBed.configureTestingModule({declarations: [UserControlComponent], imports: [CommonModule], providers: [{provide: LogoutService, useValue: mockLogoutService}]});
        });
        it('Dropdown element to not appear by default', () => {
            const fixture = TestBed.createComponent(UserControlComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.user-control-dropdown')).toBe(null);
        });
        it('Dropdown element to appear after user control element is clicked', () => {
            const fixture = TestBed.createComponent(UserControlComponent);
            fixture.detectChanges();
            const userControlElement = fixture.nativeElement.querySelector('.user-control');
            userControlElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('.user-control-dropdown')).not.toBe(null);
        });
        it('Logout service to be called after logout option is clicked', () => {
            spyOn(mockLogoutService, 'logOut');
            const fixture = TestBed.createComponent(UserControlComponent);
            fixture.detectChanges();
            const userControlElement = fixture.nativeElement.querySelector('.user-control');
            userControlElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            const logoutOptionElement = fixture.nativeElement.querySelector('#logout-option');
            logoutOptionElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(logoutOptionElement.textContent).toBe('Log out');
            expect(mockLogoutService.logOut).toHaveBeenCalled();
            
        })
    })
})