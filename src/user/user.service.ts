import UserRepository from "./user.repository";
import User from "./user.entity";
import InMemoryDB from "../shared/db/InMemoryDB";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository(new InMemoryDB(), "users");
    }

    getUsers() {
        return this.userRepository.all();
    }

    getUser(id: string) {
        return this.userRepository.findOne(id);
    }

    createUser(user: User) {
        return this.userRepository.create(user);
    }

    updateUser(id: string, user: User) {
        return this.userRepository.update(id, user);
    }

    deleteUser(id: string) {
        return this.userRepository.delete(id);
    }
}

export default UserService;