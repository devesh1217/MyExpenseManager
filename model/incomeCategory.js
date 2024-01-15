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

const incomeCategory = mongoose.model('incomeCategory', schema);

export default incomeCategory;