import { User } from "../entities/user";
import { BaseRepository } from "./repository.base";


export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User);
    }

}