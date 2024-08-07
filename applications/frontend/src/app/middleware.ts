import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        jwtDecode(token)
        return NextResponse.next()
    } catch (error) {
        console.error('Invalid token:', error)
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/dashboard']
}