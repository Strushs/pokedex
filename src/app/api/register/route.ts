import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, email, password } = body;

    console.log(
      `Nowy użytkownik zarejestrowany! Log z backendu. Username: ${username}, Email: ${email}, Hass: ${password ? "yes" : "no"}`,
    );

    return NextResponse.json(
      {
        success: true,
        message: `Witaj ${username} na serwerze API!`,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        success: false,
        error: "Wysłano nieprawidłowe dane JSON",
      },
      { status: 400 },
    );
  }
}
