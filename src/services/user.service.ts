import { User } from "../entities/user";
import { UserRepository } from "../repositories/user.repository";
import { ServiceBase } from "./service.base";

class UserService extends ServiceBase<User> {
    constructor() {
        super(UserRepository)
    }

}

export const userService = new UserService();