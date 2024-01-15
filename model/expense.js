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
    sentTo: {
        type: String,
    },
    entryDate: {
        type: Date,
        default: new Date(),
    },
});

const expenseRecord = mongoose.model('expenseRecord', schema);

export default expenseRecord;