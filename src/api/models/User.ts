import {Schema, model} from "mongoose";

interface User {
    login: string;
    email: string;
    password: string;
    active: boolean;
}

const schema = new Schema<User>({
    login: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    active: {type: Boolean, default: false},
})

const UserModel = model<User>('User', schema)