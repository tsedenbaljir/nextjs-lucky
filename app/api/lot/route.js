import { NextResponse } from "next/server";
import knex from '../db';

export async function GET(request) {
    try {
        // Fetch data from the database and calculate the sum of the "money" column
        const data = await knex('lottery').select("*").where('money', '<', 500001);

        // Return a JSON response with the fetched data
        return NextResponse.json({ data: data }, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
