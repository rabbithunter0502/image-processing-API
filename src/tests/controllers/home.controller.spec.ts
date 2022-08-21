import supertest from 'supertest';
import app from "../../index";
const request = supertest(app);

describe('Home controller', (): void => {
  it('gets /', async (): Promise<void> => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
  });
});
