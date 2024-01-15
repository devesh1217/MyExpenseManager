import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    accountOpeningDate: {
        type: Date,
        default: new Date(),
    },
    accountName: {
        type: String,
        required: true,
    },
    accountDesc: {
        type: String,
        required: false,
    },
    openingBalance: {
        type: Number,
        required: true,
    },
    currentBalance: {
        type: Number,
        required: true,
    },
    
});

const account = mongoose.model('account', schema);

export default account;