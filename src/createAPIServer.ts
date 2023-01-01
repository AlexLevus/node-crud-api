import http from 'node:http';
import { User, UserController } from './user';
import InMemoryDB from './shared/db/InMemoryDB';

interface InitialData {
    users: User[];
}

const createAPIServer = (initialData: InitialData) => {
    const db = new InMemoryDB();
    db.initialize({
        users: initialData.users,
    });

    const userController = new UserController();

    return http.createServer(async (req, res) => {
        try {
            if (req.url === '/api/users' && req.method === 'GET') {
                await userController.getUsers(req, res);
            } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'GET') {
                const id = req.url.split('/')[3];
                await userController.getUser(req, res, id);
            } else if (req.url === '/api/users' && req.method === 'POST') {
                await userController.createUser(req, res);
            } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
                const id = req.url.split('/')[3];
                await userController.updateUser(req, res, id);
            } else if (req.url?.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
                const id = req.url.split('/')[3];
                await userController.deleteUser(req, res, id);
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(
                    JSON.stringify({
                        message: 'This route does not exist',
                    })
                );
            }
        } catch (e) {
            console.log(e);
            res.writeHead(500, { 'Content-Type': 'text/json' });
            res.end(JSON.stringify({ message: 'Internal server error' }));
        }
    });
};

export default createAPIServer;
