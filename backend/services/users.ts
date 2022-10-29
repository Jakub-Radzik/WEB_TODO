import { verify } from "jsonwebtoken";
import { LoginInput, LoginResponse, RegisterInput, User } from "../graphQL/types/user";
import { TOKEN_SECRET } from "../utils";
import { generateAccessToken } from "../utils/JWT/jwt";
import { UserModel } from "../utils/Mongo/connection";

type UserService = {
    login: (input: LoginInput) => Promise<LoginResponse | null>,
    register: (input: RegisterInput) => Promise<LoginResponse | null>,
    getUser: (userId: string) => Promise<User | null>,
    getUserByToken: (token: string) => Promise<User | null>,
    getUserByGmail: (gmail: string) => Promise<User | null>,
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
        const newUser = await UserModel.create({ firstName, lastName, login, email, password });
        const token = generateAccessToken(login);

        return {
            token,
            user: newUser
        }
    },
    getUser: async (userId: string) => {
        return UserModel.findById(userId);
    },
    getUserByToken: async (token: string) => {
        const decoded = verify(token, TOKEN_SECRET);
        if(!decoded){
            throw new Error('Invalid token');
        }
        return UserModel.findOne({login: decoded});
    },
    getUserByGmail: async (gmail: string) => {
        return UserModel.findOne({googleEmail: gmail});
    }
}

export default userService;