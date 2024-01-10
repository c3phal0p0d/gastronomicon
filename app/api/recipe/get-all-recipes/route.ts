import Recipe from "../../../models/Recipe";
import dbConnect from "../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();

    try {
        const recipesList = await Recipe.find();
        console.log("recipes list:");
        console.log(recipesList);
        return NextResponse.json({ recipesList });
    } catch (err: any) {
        console.log(err);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};