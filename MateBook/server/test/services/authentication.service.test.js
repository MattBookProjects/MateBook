import authenticationService from "../../app/services/authentication.service";
import database from "../../app/database/database"
import { jest } from "@jest/globals";
import ResponseConst from "../../app/constants/response.const";

describe('Tests for authentication service', () => {
    let user_id, session_token;
    beforeAll(() => {
        user_id = 1;
        session_token = 'session_token'
    });
    describe('Tests for authenticate function', () => {
        test('Should return status 200 if authenticated succesfully', async () => {
            database.sessionExists = jest.fn().mockResolvedValueOnce(true);
            await expect(authenticationService.authenticate(user_id, session_token)).resolves.toEqual(true)

        });
        test('Should return status 401 if user couldnt be authenticated', async () => {
            database.sessionExists = jest.fn().mockResolvedValueOnce(false);
            await expect(authenticationService.authenticate(user_id, session_token)).rejects.toEqual(ResponseConst.RESPONSE_UNAUTHENTICATED);     
        });
        test('Should return status 500 if an internal error occured', async () => {
            database.sessionExists = jest.fn().mockRejectedValueOnce('error');
            await expect(authenticationService.authenticate(user_id, session_token)).rejects.toEqual(ResponseConst.RESPONSE_INTERNAL_ERROR)
         
        })
    })
})