'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from 'cookies-next';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  padding: 0 1rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
    text-decoration: none;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: -0.5px;
  margin: 0;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #2c3e50;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  margin-left: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 1.5rem;
  }
`;

const LogoutButton = styled.button`
  color: #2c3e50;
  font-weight: 500;
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #e74c3c;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: 1.5rem;
  }
`;

const Header: React.FC = () => {
    const [isUserLogged, setIsUserLogged] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = getCookie('token');
            setIsUserLogged(!!token);
        };

        checkLoginStatus();
        const intervalId = setInterval(checkLoginStatus, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        deleteCookie('token');
        setIsUserLogged(false);
        router.push('/login');
    };

    return (
        <HeaderContainer>
            <HeaderContent>
                <Link href="/" passHref>
                    <Logo>Blog Capital</Logo>
                </Link>
                <Nav>
                    {isUserLogged ? (
                        <>
                            <NavLink href="/dashboard">My Dashboard</NavLink>
                            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                        </>
                    ) : (
                        <NavLink href="/login">Login</NavLink>
                    )}
                </Nav>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;
