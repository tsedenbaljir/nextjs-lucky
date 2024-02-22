import { NextResponse } from "next/server";
import knex from '../db';

export async function GET(request) {
    try {
        // Fetch data from the database and calculate the sum of the "money" column
        const data = await knex('lottery').sum('money as totalMoney');
        const dataIs = await knex('lottery').select('number').count('* as count').where('type', 1).groupBy('number');

        // Return a JSON response with the fetched data
        return NextResponse.json({ data: data, dataIs }, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
