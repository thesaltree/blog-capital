const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:3000';

interface AuthResponse {
    token?: string;
    error?: string;
}

export const userRepository = {
    async login(email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { error: data.message || 'Login failed' };
            }

            return { token: data.token };
        } catch (error) {
            return { error: 'An error occurred. Please try again.' };
        }
    },

    async signup(name: string, email: string, password: string): Promise<AuthResponse> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.status === 409) {
                return { error: 'Email is already in use. Please use a different email or log in.' };
            }

            if (!response.ok) {
                return { error: data.message || 'Signup failed' };
            }

            return { token: data.token };
        } catch (error) {
            return { error: 'An error occurred. Please try again.' };
        }
    }
}