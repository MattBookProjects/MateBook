import { TestBed } from "@angular/core/testing";
import { LoginPageComponent } from "./login-page.component.";
import { LoginService } from "src/app/common/login/login.service";
import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";

describe('Tests for login page component', () => {
    let mockLoginService: LoginService;

    beforeEach(() => {
        mockLoginService = {
            login: (username: string, password: string) => new Promise((res, rej) => res(null))
        } as unknown as LoginService
        TestBed.configureTestingModule({declarations: [LoginPageComponent], imports: [FormsModule], providers: [{provide: LoginService, useValue: mockLoginService}], schemas: [NO_ERRORS_SCHEMA]});
    })
    it('Empty fields after creation', () => {
        const fixture = TestBed.createComponent(LoginPageComponent);
        fixture.detectChanges();
        expect(fixture.componentInstance.username).toBe('');
        expect(fixture.componentInstance.password).toBe('');
        expect(fixture.componentInstance.error).toBe(null);
        expect(fixture.nativeElement.querySelector('#username').textContent).toBe('');
        expect(fixture.nativeElement.querySelector('#password').textContent).toBe('');
        expect(fixture.nativeElement.querySelector('error')).toBe(null);
    });
    it('DOM elements should reflect changes', () => {
        const fixture = TestBed.createComponent(LoginPageComponent);
        fixture.detectChanges();
        fixture.nativeElement.querySelector('#username').value = 'username';
        fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
        fixture.nativeElement.querySelector('#password').value = 'password';
        fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(fixture.componentInstance.username).toBe('username');
        expect(fixture.componentInstance.password).toBe('password');
    });
    it('Error message to appear when trying to log in without entering username', () => {
        const fixture = TestBed.createComponent(LoginPageComponent);
        spyOn(mockLoginService, 'login')
        fixture.detectChanges();
        fixture.componentInstance.login();
        fixture.detectChanges();
        expect(fixture.componentInstance.error).toBe('Username is required');
        expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        expect(mockLoginService.login).not.toHaveBeenCalled();
    });
    it('Error message to appear when trying to log in without entering password', () => {
        const fixture = TestBed.createComponent(LoginPageComponent);
        spyOn(mockLoginService, 'login')
        fixture.detectChanges();
        fixture.nativeElement.querySelector('#username').value = 'username';
        fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.componentInstance.login();
        fixture.detectChanges();
        expect(fixture.componentInstance.error).toBe('Password is required');
        expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        expect(mockLoginService.login).not.toHaveBeenCalled();
    });
    it('Login service to be called on login when username and password are entered', () => {
        const fixture = TestBed.createComponent(LoginPageComponent);
        spyOn(mockLoginService, 'login')
        fixture.detectChanges();
        fixture.nativeElement.querySelector('#username').value = 'username';
        fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
        fixture.nativeElement.querySelector('#password').value = 'password';
        fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.componentInstance.login();
        fixture.detectChanges();
        expect(fixture.componentInstance.error).toBe(null);
        expect(fixture.nativeElement.querySelector('error')).toBe(null);
        expect(mockLoginService.login).toHaveBeenCalledWith('username', 'password');
    });
    it('Login service to be called on button click when username and password are entered', () => {
        const fixture = TestBed.createComponent(LoginPageComponent);
        spyOn(mockLoginService, 'login')
        fixture.detectChanges();
        fixture.nativeElement.querySelector('#username').value = 'username';
        fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
        fixture.nativeElement.querySelector('#password').value = 'password';
        fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(fixture.componentInstance.error).toBe(null);
        expect(fixture.nativeElement.querySelector('error')).toBe(null);
        expect(mockLoginService.login).toHaveBeenCalledWith('username', 'password');
    });
    it('Show error message when login service returns error', async () => {
        mockLoginService = {
            login: (username: string, password: string) => new Promise((res, rej) => res('Incorrect username or password'))
        } as unknown as LoginService;
        TestBed.configureTestingModule({declarations: [LoginPageComponent], imports: [FormsModule], providers: [{provide: LoginService, useValue: mockLoginService}], schemas: [NO_ERRORS_SCHEMA]});
        const fixture = TestBed.createComponent(LoginPageComponent);
        const component = fixture.componentInstance;
        component.username = 'username';
        component.password = 'password';
        await component.login();
        fixture.detectChanges();
        expect(component.error).toBe('Incorrect username or password');
        expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
    })
})