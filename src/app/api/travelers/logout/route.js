import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json(
    { message: "خروج با موفقیت انجام شد" },
    { status: 200 }
  );

  // حذف کوکی با تنظیم maxAge روی 0
  response.cookies.set("user", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
