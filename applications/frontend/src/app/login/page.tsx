'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import styled from 'styled-components';
import { userRepository } from "@/app/services/UserRepository";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Roboto', sans-serif;
  padding: 1rem;
`;

const LoginCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  backdrop-filter: blur(10px);

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #333333;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  width: 95%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #3494e6;
    box-shadow: 0 0 0 3px rgba(52, 148, 230, 0.2);
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3494e6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #4a5568;

  a {
    color: #3494e6;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      color: #2980b9;
      text-decoration: underline;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-top: 0.75rem;
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const result = await userRepository.login(email, password);
    if (result.error) {
      setError(result.error);
    } else if (result.token) {
      setCookie('token', result.token, {
        maxAge: 60 * 60 * 24,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      router.push('/');
    }
  };

  return (
      <PageContainer>
        <LoginCard>
          <Title>Welcome Back</Title>
          <Form onSubmit={handleSubmit}>
            <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button type="submit">Sign In</Button>
          </Form>
          <SignUpLink>
            New user? <Link href="/signup">Create an account</Link>
          </SignUpLink>
        </LoginCard>
      </PageContainer>
  );
};

export default Login;