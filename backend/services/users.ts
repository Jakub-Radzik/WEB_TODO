import { LoginInput, LoginResponse, RegisterInput, User } from "../graphQL/types/user";
import { UserModel } from "../utils/Mongo/connection";

type UserService = {
    login: (input: LoginInput) => Promise<LoginResponse | null>,
    register: (input: RegisterInput) => Promise<User | null>,
    getUser: (userId: string) => Promise<User | null>,
}

const userService: UserService = {
    login: async (input: LoginInput) => {
        const { login, password } = input;
        let user = await UserModel.findOne({ login });
        if (!user) {
            user = await UserModel.findOne({ email: login });
            if(!user) {
                throw new Error('User not found');
            }
        }
        if(user.password !== password) {
            throw new Error('Wrong password');
        }
        // generate token
        return {
            token : 'token',
            user
        }
    },
    register: async (input: RegisterInput) => {
        console.log(input);
        const { firstName, lastName, login, email, password, repeatPassword } = input;
        if(password !== repeatPassword) {
            throw new Error('Passwords do not match');
        }
        return await UserModel.create({ firstName, lastName, login, email, password });
    },
    getUser: async (userId: string) => {
        return UserModel.findById(userId);
    }
}

export default userService;