import { NextResponse } from "next/server";
import knex from '../db';

export async function POST(req) {
    try {
        const number = req.nextUrl.searchParams.get("number");
        
        await knex('lottery').where({ number: number, type: null }).update({ type: 1 });

        return NextResponse.json({ data: "success" }, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error("Error updating data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
