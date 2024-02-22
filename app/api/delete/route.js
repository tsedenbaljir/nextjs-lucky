import { NextResponse } from "next/server";
import knex from '../db';

export async function GET(request) {
    try {
        // Delete records from the database where the "number" column is empty
        const deletedCount = await knex('lottery').where('number', '').del();

        // Return a JSON response indicating the number of records deleted
        return NextResponse.json({ message: `${deletedCount} records deleted successfully` }, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error("Error deleting data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
