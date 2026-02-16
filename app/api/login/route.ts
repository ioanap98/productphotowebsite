// Import NextResponse to send HTTP responses in Next.js API routes
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'secret123';

// This function handles POST requests to the /api/login route
export async function POST(req: Request) {

  // Await and parse the JSON body of the incoming request
  // It expects a body like: { "password": "userInput" }
  const body = await req.json();

  // Check if the password sent by the user matches the correct admin password
  if (body.password === ADMIN_PASSWORD) {

    // If the password is correct, return a success response
    const res = NextResponse.json({ success: true });

    // Set a secure cookie called 'admin-auth' with value 'true'
    // This cookie will be used later to check if the user is logged in
    res.cookies.set('admin-auth', 'true', {
      httpOnly: true,     // This makes the cookie inaccessible to JavaScript on the frontend (more secure)
      path: '/',          // Cookie is valid for the entire site
      maxAge: 60 * 60 * 24, // Cookie lasts for 1 day (in seconds)
    });
    
    // Return the response with the cookie set
    return res;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
