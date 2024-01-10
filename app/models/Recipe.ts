import { Int32, ObjectId } from "mongodb";
import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
    {
        recipeName: {
            type: String,
            required: true,
            unique: true,
        },
        addedby: {
            type: ObjectId,
        },
        imageURL: {
            type: String,
        },
        preparationTime: {
            type: String,
            required: true,
        },
        servings: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
        },
        ingredients: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        sourceURL: {
            type: String,
        },
    },
    { timestamps: true },
);


export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);