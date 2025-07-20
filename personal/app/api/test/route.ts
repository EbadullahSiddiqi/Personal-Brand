import { NextResponse } from "next/server"

export async function GET() {
    console.log(process.env.DATABASE_URL)
    return NextResponse.json({
        neon: process.env.DATABASE_URL
    })
}