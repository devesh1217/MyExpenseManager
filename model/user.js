import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    registrationDate: {
        type: Date,
        default: new Date(),
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    defaultAccount: {
        type: String,
        required: true,
        default: 'A1'
    },
    profession: {
        type: String,
    },
});

const user = mongoose.model('user', schema);

export default user;