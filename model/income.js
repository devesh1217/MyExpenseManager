import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionDate: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    receivedFrom: {
        type: String,
    },
    entryDate: {
        type: Date,
        default: new Date(),
    },
});

const incomeRecord = mongoose.model('incomeRecord', schema);

export default incomeRecord;