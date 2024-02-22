import { NextResponse } from "next/server";
import knex from './db';

export async function GET(request) {
    const data = await knex('lottery').select('*');

    return NextResponse.json({ data: data });
}