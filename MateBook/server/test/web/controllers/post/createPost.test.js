import { createPost } from "../../../../app/web/controllers/post/createPost.js";
import postService from "../../../../app/services/post.service.js"
import { jest } from '@jest/globals'
import ResponseConst from "../../../../app/constants/response.const";


describe('Tests for create post controller', () => {
    let response, request;
    beforeEach(() => {
        response = {
            status: jest.fn().mockReturnValue({json: jest.fn()})
        };
        request = {
            body: {
                auth: {
                    user_id: 1,
                    session_token: 'token'
                },
                content: 'content'
            }
        }
    })
    describe('Should return 400 on bad request', () => {
        test('Return 400 on missing content', async () => {
            request = {
                body: {
                    auth: {
                        user_id: 1,
                        session_token: 'token'
                    }
                }
            };
            postService.create = jest.fn().mockResolvedValueOnce(ResponseConst.RESPONSE_CREATED);
            await createPost(request, response);
            expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_INVALID_INPUT.status);
            expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INVALID_INPUT.message}); 
        });
    });

    describe('Return 500 on internal server error', () => {
        test('Return 500 on internal server error', async () => {
            postService.create = jest.fn().mockRejectedValueOnce(ResponseConst.RESPONSE_INTERNAL_ERROR);
            await createPost(request, response);
            expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_INTERNAL_ERROR.status);
            expect(response.status().json).toHaveBeenCalledWith({message: ResponseConst.RESPONSE_INTERNAL_ERROR.message});
        })
    });

    describe('Return 201 on success', () => {
        test('Return 201 on successfull creation', async () => {
            postService.create = jest.fn().mockResolvedValueOnce(ResponseConst.RESPONSE_CREATED);
            await createPost(request, response);
            expect(response.status).toHaveBeenCalledWith(ResponseConst.RESPONSE_CREATED.status);
        })
    })
})