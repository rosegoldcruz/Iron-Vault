import { NextResponse } from "next/server";

type IntakePayload = {
  email?: string;
  wallet?: string;
  lane?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as IntakePayload | null;

  if (!body?.email || !isValidEmail(body.email)) {
    return NextResponse.json(
      { error: "Provide a valid contact email so the desk can return instructions." },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      message: `Request secured for ${body.lane ?? "review queue"}.`,
      nextStep: "The operating desk will respond with allocation guidance within the review window.",
    },
    { status: 202 },
  );
}