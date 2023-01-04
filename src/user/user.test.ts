import request from 'supertest';
import createAPIServer from '../createAPIServer';
import User from "./user.entity";
import errorMessages from "../shared/const/errorMessages";

const app = createAPIServer({
    users: []
});

describe('Integration test for User entity', () => {
    let user = {
        username: 'Alex',
        age: 23,
        hobbies: ['programming'],
    } as User;

    it('Retrieve empty array by GET /api/users', done => {
        request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [], done);
    });

    it('Create new user by POST /api/users', done => {
        request(app)
            .post('/api/users')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(res => {
                res.text.includes(JSON.stringify(user));
                user = JSON.parse(res.text);
            })
            .expect(201, done);
    });

    it('Retrieve new user by GET /api/users/:id', done => {
        request(app)
            .get(`/api/users/${user.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, JSON.stringify(user), done);
    });

    it('Update new user by PUT /api/users/:id', done => {
        user.username = "Petr";
        user.age = 40;

        request(app)
            .put(`/api/users/${user.id}`)
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, JSON.stringify(user), done);
    });

    it('Delete new user by DELETE /api/users/:id', done => {
        request(app)
            .delete(`/api/users/${user.id}`)
            .expect(204, done);
    });

    it('Assert that user deleted by GET /api/users/:id', done => {
        request(app)
            .get(`/api/users/${user.id}`)
            .expect(404, done);
    });
});

describe('POST /api/user', () => {
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
                    message: errorMessages.missingRequiredFields(['username', 'age']),
                },
                done
            );
    });
});

describe('Error handling', () => {
    it('Return 404 code if route does not exist', done => {
        request(app)
            .get('/api/abra/kadabra')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, {
                message: errorMessages.routeNotExist
            }, done);
    });

    it('Return 500 code for internal error', done => {
        request(app)
            .get('/api/abra/kadabra')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, {
                message: errorMessages.routeNotExist
            }, done);
    });

    it('Return 400 for bad request', done => {
        request(app)
            .post('/api/users')
            .send('{"invalid"}')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, {
                message: errorMessages.incorrectJSON
            }, done);
    });
})

afterAll(() => {
    return app.close();
});
