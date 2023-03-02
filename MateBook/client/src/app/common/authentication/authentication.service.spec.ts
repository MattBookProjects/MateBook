import { AuthenticationService } from "./authentication.service"

describe('Tests for authentication service', () => {
    it('auth should be null after creation', () => {
        const authenticationService = new AuthenticationService();
        expect(authenticationService.auth).toBe(null);
    })
    describe('Tests for logIn function', () => {
        it('Auth is set after calling logIn', () => {
            const authenticationService =  new AuthenticationService();
            authenticationService.logIn({user_id: 1, session_token: 'token'});
            expect(authenticationService.auth).toEqual({user_id: 1, session_token: 'token'});
        });
    });
    describe('Tests for logOut function', () => {
        it('Auth is null after logIn and then logOut', () => {
            const authenticationService = new AuthenticationService();
            authenticationService.logIn({user_id: 1, session_token: 'token'});
            authenticationService.logOut();
            expect(authenticationService.auth).toBe(null);
        });
    });
    describe('Tests for isLoggedIn function', () => {
        it('Return true after user logs in', () => {
            const authenticationService = new AuthenticationService();
            authenticationService.logIn({user_id: 1, session_token: 'token'});
            expect(authenticationService.isLoggedIn()).toBe(true);
        });

        it('Return false before user logs in', () => {
            const authenticationService = new AuthenticationService();
            expect(authenticationService.isLoggedIn()).toBe(false);
        });

        it('Return false before user logs in', () => {
            const authenticationService = new AuthenticationService();
            authenticationService.logIn({user_id: 1, session_token: 'token'});
            authenticationService.logOut();
            expect(authenticationService.isLoggedIn()).toBe(false);
        });
    })

})