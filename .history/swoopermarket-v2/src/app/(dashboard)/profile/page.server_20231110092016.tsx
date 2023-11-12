// src/app/(dashboard)/profile/page.server.tsx

import jwt from 'jsonwebtoken';
import nookies from 'nookies';

// src/app/(dashboard)/profile/page.server.tsx
import { NextRequest, NextResponse } from 'next/server';

// Define the TypeScript interface for the JWT payload
interface JwtPayload {
  email: string;
  name: string;
}

export async function load({ request }: { request: NextRequest }) {
    const cookies = request.cookies;
    const token = cookies.get('token');
  
    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as unknown as JwtPayload;
      return new NextResponse(JSON.stringify({ user: decoded }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
}

  
