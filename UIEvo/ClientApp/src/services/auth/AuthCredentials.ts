import { IAuthCredentials } from "./IAuthCredentials";

export default class AuthCredentials implements IAuthCredentials {

    email: string = "";

    password: string = "";

    rememberMe: boolean = false;
}