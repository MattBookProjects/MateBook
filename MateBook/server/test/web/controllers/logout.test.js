import { jest } from '@jest/globals';
import ResponseConst from '../../../app/constants/response.const';
import logoutService from '../../../app/services/logout.service';
import logout from '../../../app/web/controllers/logout';

describe('Tests for logout endpoint', () => {
    const request = {
        body:{
            auth:{
            user_id: 1,
            session_token: 'session_token'
            }
        }
    }
    const response = {
        status: jest.fn().mockReturnValue({json: jest.fn()})
    };
    test('Should return 200 on correct logout', async () => {
        logoutService.logout = jest.fn().mockResolvedValueOnce(true);
        await logout(request, response);
        expect(response.status).toHaveBeenCalledWith(200);
    });
    test('Should return 500 if an internal error occured', async () => {
        logoutService.logout = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_INTERNAL_ERROR);
        await logout(request, response);
        expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_INTERNAL_ERROR.status);
        expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INTERNAL_ERROR.message})
    });
})