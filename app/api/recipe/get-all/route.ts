import Recipe from "../../../models/Recipe";
import dbConnect from "../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    console.log("searchParams id:" + userEmail);


    try {
        let recipesList = await Recipe.find({addedBy: userEmail}).sort('-createdAt').exec();
        return NextResponse.json({ recipesList });
    } catch (err: any) {
        console.log(err);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};