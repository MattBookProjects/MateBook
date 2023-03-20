import logoutService from '../../app/services/logout.service';
import database from '../../app/database/database';
import {  jest } from '@jest/globals';
import ResponseConst from '../../app/constants/response.const'

describe('Tests for logout service', () => {
    describe('Tests for logout function', () => {
        const user_id = 1;
        const session_token = 'session_token'
        test('Should return 200 on correct logout', async () => {
            database.deleteSession = jest.fn().mockResolvedValueOnce(true);
            await expect(logoutService.logout(user_id, session_token)).resolves.toEqual(ResponseConst.RESPONSE_OK);
        });
        test('Should return 500 if internal error occures during deleting session from database', async () => {
            database.deleteSession = jest.fn().mockRejectedValueOnce('error');
            await expect(logoutService.logout(user_id, session_token)).rejects.toEqual(ResponseConst.RESPONSE_INTERNAL_ERROR);
        });
    });
})