import userService from "../../services/users"
import { LoginInput, RegisterInput } from "../types/user"

export const login = async (input: LoginInput) => {
    return userService.login(input);
}

export const register = async (input: RegisterInput) => {
    return userService.register(input);
}

export const getUser = async (userId: string) => {
    return userService.getUser(userId);
}
