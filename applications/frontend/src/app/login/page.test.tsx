import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './page';
import { userRepository } from '@/app/services/UserRepository';
import { useRouter } from 'next/navigation';
import {beforeEach, describe} from "@jest/globals";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/app/services/UserRepository', () => ({
    userRepository: {
        login: jest.fn(),
    },
}));

jest.mock('cookies-next', () => ({
    setCookie: jest.fn(),
}));

describe('Login Component', () => {
    beforeEach(() => {
        useRouter.mockReturnValue({
            push: jest.fn(),
        });
    });

    test('renders login form', () => {
        render(<LoginPage />);
        expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    test('displays error message on failed login', async () => {
        userRepository.login.mockResolvedValue({ error: 'Invalid credentials' });

        render(<LoginPage />);

        await userEvent.type(screen.getByPlaceholderText('Email address'), 'test@example.com');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });

    test('redirects on successful login', async () => {
        const mockToken = 'mock-token';
        userRepository.login.mockResolvedValue({ token: mockToken });
        const mockRouter = { push: jest.fn() };
        useRouter.mockReturnValue(mockRouter);

        render(<LoginPage />);

        await userEvent.type(screen.getByPlaceholderText('Email address'), 'test@example.com');
        await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(mockRouter.push).toHaveBeenCalledWith('/');
        });
    });
});
