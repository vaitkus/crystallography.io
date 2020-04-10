const request = require('supertest');
import { startApplication } from './application';

describe("Express Application", () => {

    let mockContext: any = {
      log: () => {},
      PORT: '8080',
      releases: ['mock-release']
    };

    test("should export start application", async() => {
        await startApplication(mockContext);
    });

    test("should return application with 200 for / ", async () => {
        const { app } = await startApplication(mockContext);
        const response = await request(app).get('/');
        const { statusCode, header } = response;

        expect(statusCode).toEqual(200);
        expect(header['content-type']).toEqual('text/html; charset=utf-8');
    });

    test("should return information about releases based on context", async () => {
        const { app } = await startApplication(mockContext);
        const response = await request(app).get('/version');
        const { text } = response;

        expect(JSON.parse(text)).toEqual(mockContext.releases);
    });
});
