import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Analytics temporarily disabled." },
    { status: 200 }
  );
}
