// src/app/(dashboard)/profile/page.server.tsx
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';

// Define the TypeScript interface for the JWT payload
interface JwtPayload {
  id: string;
  email: string;
  name: string;
}

export async function load({ request }: { request: NextRequest }) {
    const cookies = nookies.get({ req: request as any });
    const token = cookies.token;
  
    console.log("Token:", token); // For debugging
  
    if (!token) {
      throw new Response('Unauthorized', { status: 401 });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
      console.log("Decoded JWT:", decoded); // For debugging
      return { props: { user: decoded } };
    } catch (err) {
      console.error("JWT Verification Error:", err); // For debugging
      throw new Response('Unauthorized', { status: 401 });
    }
  }
  
