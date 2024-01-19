import Recipe from "../../../models/Recipe";
import dbConnect from "../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: Request) => {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const recipe = await Recipe.findById(id);
        console.log("recipe: " + recipe);
        // return NextResponse.json({ recipe });
        return new NextResponse(recipe, {
            status: 200,
        });
    } catch (err: any) {
        console.log(err);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};