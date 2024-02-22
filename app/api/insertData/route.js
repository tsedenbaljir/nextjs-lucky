import { NextResponse } from "next/server";
import knex from '../db';

export async function POST(req) {
    try {
        const number = req.nextUrl.searchParams.get("number");
        const money = req.nextUrl.searchParams.get("money");

        await knex('lottery').insert({ number, money });

        return NextResponse.json({ data: "success" }, { status: 200 });
    } catch (error) {
        // Return error response if any exception occurs
        return NextResponse.json({ data: "error" }, { status: 500 });
    }
}
