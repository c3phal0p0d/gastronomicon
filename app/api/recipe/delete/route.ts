import Recipe from "../../../models/Recipe";
import dbConnect from "../../../utils/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        await Recipe.findByIdAndDelete(id);
        return new NextResponse("Recipe has been deleted", {
            status: 200,
        });
    } catch (err: any) {
        console.log(err);
        return new NextResponse(err.message, {
            status: 500,
        });
    }
};