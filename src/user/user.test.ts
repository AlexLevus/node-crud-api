import request from 'supertest';
import createAPIServer from '../createAPIServer';
import initialUsers from "../initialUsers";

const app = createAPIServer({
    users: initialUsers,
});

describe('GET /api/users', () => {
    it('responds with json', done => {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('POST /api/user', () => {
    it('Success create new user', done => {
        request(app)
            .post('/api/users')
            .send({
                username: 'Alex',
                age: 23,
                hobbies: ['programming'],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, 'true', done);
    });

    it('400 with error message if required fields is missing', done => {
        request(app)
            .post('/api/users')
            .send({
                hobbies: ['programming'],
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(
                400,
                {
                    message: 'Required fields (username, age) must be provided',
                },
                done
            );
    });
});

afterAll(() => {
    return app.close();
});
