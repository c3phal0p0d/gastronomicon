import Recipe from "../../../models/Recipe";
import dbConnect from "../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const { recipeName, imageURL, preparationTime, servings, category, ingredients, instructions, sourceURL, addedBy } = await request.json();

    await dbConnect();

    console.log(recipeName);
    console.log(addedBy);

    const newRecipe = new Recipe({
        recipeName, 
        imageURL, 
        preparationTime, 
        servings, 
        category, 
        ingredients, 
        instructions, 
        sourceURL,
        addedBy,
    });

    try {
        await newRecipe.save();
        return new NextResponse("Recipe has been added", {
            status: 201,
        });
    } catch (err: any) {
        console.log(err);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};