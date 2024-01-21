import Recipe from "../../../models/Recipe";
import dbConnect from "../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    const searchQuery = searchParams.get('q') || "";

    console.log("user email:" + userEmail);
    console.log("search query: " + searchQuery);

    try {
        let recipesList;
        if (searchQuery==""){
            // Display all recipes
            recipesList = await Recipe.find({addedBy: userEmail}).sort('-createdAt').exec();
        } else {
            // Filter names of recipes by search query
            recipesList = await Recipe.find({addedBy: userEmail}).find({recipeName: new RegExp(searchQuery, 'i')}).sort('-createdAt').exec();
        }

        return NextResponse.json({ recipesList });
    } catch (err: any) {
        console.log(err);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};