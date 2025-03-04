import { db } from "@/server/db";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json() as { id?: string };

    if (!id) {
      return NextResponse.json({ error: "ID not" });
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "An error occurred while fetching the user" });
  }
}