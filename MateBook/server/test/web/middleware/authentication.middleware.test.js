import authenticationMiddleware from "../../../app/web/middleware/authentication.middleware.js";
import { jest } from "@jest/globals"
import authenticationService from "../../../app/services/authentication.service.js";
import ResponseConst from "../../../app/constants/response.const.js";

describe('Tests for authenctication middleware', () => {
    let response, request, next;
    beforeAll(() => {
        response = {
            status: jest.fn().mockReturnValue({json: jest.fn()})
        }
        next = jest.fn();
    })
    beforeEach(() => {
        request = {
            body: {
                auth: {
                    user_id: 1,
                    session_token: 'session_token'
                }
            }
        };
    })
    test('Should return 401 on missing authentication object', async () => {
        request = {
            body: {}
        };
        await authenticationMiddleware(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.status().json).toHaveBeenCalledWith({message: "User not authenticated"});
    })
    test('Should return 401 on missing user_id or token session', async () => {
        request = {
            body: {
                auth: {
                    user_id: 1
                }
            }
        }
        await authenticationMiddleware(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.status().json).toHaveBeenCalledWith({message: "User not authenticated"});
    });

    test('Should return 401 if user could not get authenticated', async () => {
        authenticationService.authenticate = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_UNAUTHENTICATED);
        await authenticationMiddleware(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.status().json).toHaveBeenCalledWith({message: "User not authenticated"});
    });

    test('Should return 500 if an internal error occured', async () => {
        authenticationService.authenticate = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_INTERNAL_ERROR);
        await authenticationMiddleware(request, response, next);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.status().json).toHaveBeenCalledWith({message: "Internal server error"});
    });

    test('Should call next when authencticated correctly', async () => {
        authenticationService.authenticate = jest.fn().mockResolvedValueOnce(true);
        await authenticationMiddleware(request, response, next);
        expect(next).toHaveBeenCalled()
    });
})