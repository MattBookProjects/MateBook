import { NO_ERRORS_SCHEMA } from "@angular/core";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RegisterService } from "src/app/common/register/register.service"
import { ErrorModule } from "../error/error.module";
import { RegisterPageComponent } from "./register-page.component";

describe('Tests for register page component', () => {
    let mockRegisterService: RegisterService;

    describe('Class tests', () => {
        beforeEach(() => {
            mockRegisterService = {
                register: (username: string, password: string, first_name: string, last_name: string) => new Promise((res, rej) => res(null))
            } as unknown as RegisterService;
            TestBed.configureTestingModule({declarations: [RegisterPageComponent], imports: [FormsModule], providers: [{provide: RegisterService, useValue: mockRegisterService}], schemas: [NO_ERRORS_SCHEMA]})
        });
        it('Fields to be empty after creation', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            const component = fixture.componentInstance;
            expect(component.username).toBe('');
            expect(component.password).toBe('');
            expect(component.first_name).toBe('');
            expect(component.last_name).toBe('');
            expect(component.repeat_password).toBe('');
        });
        it('Error to be set when tring to register when username is empty', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register')
            fixture.detectChanges();
            const component = fixture.componentInstance;
            await component.register();
            expect(component.error).toBe('Username is required');
            expect(mockRegisterService.register).not.toHaveBeenCalled();
        });
        it('Error to be set when trying to register when password is empty', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register')
            fixture.detectChanges();
            const component = fixture.componentInstance;
            component.username = 'username';
            await component.register();
            expect(component.error).toBe('Password is required');
            expect(mockRegisterService.register).not.toHaveBeenCalled();
        });
        it('Error to be set when trying to register when repeat password is empty', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register')
            fixture.detectChanges();
            const component = fixture.componentInstance;
            component.username = 'username';
            component.password = 'password';
            await component.register();
            expect(component.error).toBe('Repeat password is required');
            expect(mockRegisterService.register).not.toHaveBeenCalled();
        });
        it('Error to be set when trying to register when first name is empty', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register')
            fixture.detectChanges();
            const component = fixture.componentInstance;
            component.username = 'username';
            component.password = 'password';
            component.repeat_password = 'password'
            await component.register();
            expect(component.error).toBe('First name is required');
            expect(mockRegisterService.register).not.toHaveBeenCalled();
        });
        it('Error to be set when trying to register when last name is empty', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register')
            fixture.detectChanges();
            const component = fixture.componentInstance;
            component.username = 'username';
            component.password = 'password';
            component.repeat_password = 'password';
            component.first_name = 'first name';
            await component.register();
            expect(component.error).toBe('Last name is required');
            expect(mockRegisterService.register).not.toHaveBeenCalled();
        });
        it('Error to be set when trying to register when passwords dont match', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register')
            fixture.detectChanges();
            const component = fixture.componentInstance;
            component.username = 'username';
            component.password = 'password';
            component.repeat_password = 'password1';
            component.first_name = 'first name';
            component.last_name = 'last name';
            await component.register();
            expect(component.error).toBe('Passwords dont match');
            expect(mockRegisterService.register).not.toHaveBeenCalled();
        });
        it('Register service to be called when trying to register when fields are entered correctly', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register')
            fixture.detectChanges();
            const component = fixture.componentInstance;
            component.username = 'username';
            component.password = 'password';
            component.repeat_password = 'password';
            component.first_name = 'first name';
            component.last_name = 'last name';
            await component.register();
            expect(component.error).toBe(null);
            expect(mockRegisterService.register).toHaveBeenCalledWith('username', 'password', 'first name', 'last name');
        });  
    });
    describe('DOM element tests', () => {
        beforeEach(() => {
            mockRegisterService = {
                register: (username: string, password: string, first_name: string, last_name: string) => new Promise((res, rej) => res(null))
            } as unknown as RegisterService;
            TestBed.configureTestingModule({declarations: [RegisterPageComponent], imports: [FormsModule], providers: [{provide: RegisterService, useValue: mockRegisterService}], schemas: [NO_ERRORS_SCHEMA]})
        });
        it('Fields to be empty after creating component', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('#username').value).toBe('');
            expect(fixture.nativeElement.querySelector('#password').value).toBe('');
            expect(fixture.nativeElement.querySelector('#repeat_password').value).toBe('');
            expect(fixture.nativeElement.querySelector('#first_name').value).toBe('');
            expect(fixture.nativeElement.querySelector('#last_name').value).toBe('')
        });
        it('Error component to appear after trying to register when username is empty', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
        it('Error component to appear after trying to register when password is empty', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
        it('Error component to appear after trying to register when repeat password is empty', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#password').value = 'password';
            fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
        it('Error component to appear after trying to register when first name is empty', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#password').value = 'password';
            fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#repeat_password').value = 'password';
            fixture.nativeElement.querySelector('#repeat_password').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
        it('Error component to appear after trying to register when last name is empty', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#password').value = 'password';
            fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#repeat_password').value = 'password';
            fixture.nativeElement.querySelector('#repeat_password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#first_name').value = 'first name';
            fixture.nativeElement.querySelector('#first_name').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
        it('Error component to appear after trying to register when passwords dont match', () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#password').value = 'password';
            fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#repeat_password').value = 'password1';
            fixture.nativeElement.querySelector('#repeat_password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#first_name').value = 'first name';
            fixture.nativeElement.querySelector('#first_name').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#last_name').value = 'last name';
            fixture.nativeElement.querySelector('#last_name').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
        it('Register service to be called on correct fields values after clicking register button',() => {
           // TestBed.configureTestingModule({declarations: [RegisterPageComponent], imports: [FormsModule], providers: [{provide: RegisterService, useValue: mockRegisterService}], schemas: [NO_ERRORS_SCHEMA]});
            const fixture = TestBed.createComponent(RegisterPageComponent);
            spyOn(mockRegisterService, 'register');
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#password').value = 'password';
            fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#repeat_password').value = 'password';
            fixture.nativeElement.querySelector('#repeat_password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#first_name').value = 'first name';
            fixture.nativeElement.querySelector('#first_name').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#last_name').value = 'last name';
            fixture.nativeElement.querySelector('#last_name').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            fixture.nativeElement.querySelector('button').dispatchEvent(new Event('click'));
            fixture.detectChanges();
            //tick();
            expect(mockRegisterService.register).toHaveBeenCalledWith('username', 'password', 'first name', 'last name');
           // expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
        it('Error component not to appear after successfull registration', async () => {
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#password').value = 'password';
            fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#repeat_password').value = 'password';
            fixture.nativeElement.querySelector('#repeat_password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#first_name').value = 'first name';
            fixture.nativeElement.querySelector('#first_name').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#last_name').value = 'last name';
            fixture.nativeElement.querySelector('#last_name').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            await fixture.componentInstance.register();
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).toBe(null); 
        }); 
        it('Error component to appear after register service returns an error', async () => {
            mockRegisterService = {
                register: (username: string, password: string, first_name: string, last_name: string) => new Promise((res, rej) => res('Username already taken'))
            } as unknown as RegisterService;
            TestBed.configureTestingModule({declarations: [RegisterPageComponent], imports: [FormsModule], providers: [{provide: RegisterService, useValue: mockRegisterService}], schemas: [NO_ERRORS_SCHEMA]})
            const fixture = TestBed.createComponent(RegisterPageComponent);
            fixture.detectChanges();
            fixture.nativeElement.querySelector('#username').value = 'username';
            fixture.nativeElement.querySelector('#username').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#password').value = 'password';
            fixture.nativeElement.querySelector('#password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#repeat_password').value = 'password';
            fixture.nativeElement.querySelector('#repeat_password').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#first_name').value = 'first name';
            fixture.nativeElement.querySelector('#first_name').dispatchEvent(new Event('input'));
            fixture.nativeElement.querySelector('#last_name').value = 'last name';
            fixture.nativeElement.querySelector('#last_name').dispatchEvent(new Event('input'));
            fixture.detectChanges(); 
            await fixture.componentInstance.register();
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('error')).not.toBe(null);
        });
    })
})