import postService from "../../app/services/post.service";
import { jest } from '@jest/globals';
import sqlHelpers from "../../app/database/sqlHelpers";
import database from "../../app/database/database";
import ResponseConst from "../../app/constants/response.const";


describe('Tests for post service', () => {
    describe('Tests for create function', () => {
        const time = '2023-03-15T18:12:00'
        let author_id, content;
        beforeEach(() => {
            /*Date.prototype.constructor = jest.fn().mockReturnValueOnce({
                getFullYear: () => 2023,
                getMonth: () => 2,
                getDate: () => 15,
                getHours: () => 12,
                getMinutues: () => 0,
                getSeconds: () => 0
            }) */
            sqlHelpers.convertToSqlDatetime = jest.fn().mockReturnValue(time);
            author_id = 1;
            content = 'content';
        });
        test('Return response 201 on successfull creation', async () => {
            database.createPost = jest.fn().mockResolvedValueOnce(true);
            await expect(postService.create(author_id, content)).resolves.toEqual(ResponseConst.RESPONSE_CREATED);
            expect(database.createPost).toHaveBeenCalledWith({ author_id: 1, content: content, time: time });
        }); 
        
        test('Return 500 if internal server error occurs', async () => {
            database.createPost = jest.fn().mockRejectedValueOnce('error');
            await expect(postService.create(author_id, content)).rejects.toEqual(ResponseConst.RESPONSE_INTERNAL_ERROR);
        })

    })
})