import { LoginInput, LoginResponse, RegisterInput, User } from "../graphQL/types/user";
import { generateAccessToken } from "../utils/JWT/jwt";
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

        const token = generateAccessToken(login);
        if(!token){
            throw new Error("Token creation error");
        }
        
        return {
            token,
            user
        }
    },
    register: async (input: RegisterInput) => {
        const { firstName, lastName, login, email, password, repeatPassword } = input;

        const isLoginTaken = !!(await UserModel.findOne({login}));
        const isEmailTaken = !!(await UserModel.findOne({email}));

        if(isLoginTaken){
            throw new Error('Login is taken');
        }

        if(isEmailTaken){
            throw new Error('Email is taken')
        }

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