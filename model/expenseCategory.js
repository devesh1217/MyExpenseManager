import mongoose from "mongoose";
import { Schema } from "mongoose";

const schema = new mongoose.Schema({
    categoryID: {
        type: String,
        required: true,
        unique: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    iconURL: {
        type: String,
        required: true,
    }
});

const expenseCategory = mongoose.model('expenseCategory', schema);

export default expenseCategory;