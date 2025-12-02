import { NextResponse } from "next/server";
import { db } from "~/server/db";

const PASSWORD = "12345";

const mockedUsers = [
  { username: "Alice", password: PASSWORD },
  { username: "Bob", password: PASSWORD },
  { username: "Charlie", password: PASSWORD },
  { username: "Diana", password: PASSWORD },
  { username: "Eve", password: PASSWORD },
  { username: "Frank", password: PASSWORD },
  { username: "Grace", password: PASSWORD },
  { username: "Heidi", password: PASSWORD },
  { username: "Ivan", password: PASSWORD },
  { username: "Judy", password: PASSWORD },
];

export async function POST() {
  const count = await db.user.count();
  if (count >= mockedUsers.length) {
    return NextResponse.json({
      ok: false,
      message: "You can add more users to seed if you want 😁",
    });
  }

  await db.user.createMany({
    data: mockedUsers,
  });

  return NextResponse.json({
    ok: true,
  });
}
