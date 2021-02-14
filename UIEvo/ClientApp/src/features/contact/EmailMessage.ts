import { IEmailMessage } from "./IEmailMessage";

export default class EmailMessage implements IEmailMessage {

    public name: string = "";

    public email: string = "";

    public message: string = "";    

    public attachment?: File;    
}