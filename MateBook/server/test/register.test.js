import register from '../app/register.js';
import Database from '../database.js';
import jest from 'jest';
jest.mock('../database.js');

describe('Tests for register endpoint', () => {
    test('Should send 400 od bad or missing request parameters', async () => {
        const request = {
            body: {
                username: 'username'
            }
        };
        const response = {
            status: (status) => {
                return {
                    json: (json) => {}
                }
            }
        }
        await register(request, response);
        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.status().json).toHaveBeenCalledWith({message: 'Invalid input'});
    });
})