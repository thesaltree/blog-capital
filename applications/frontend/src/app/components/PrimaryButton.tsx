import React from "react";
import styled from "styled-components";

interface PrimaryButtonProps {
    children: React.ReactNode;
}

const StyledButton = styled.button`
  width: 100%;
  padding: 0.9rem;
  background-color: #3494e6;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.1rem;
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

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 148, 230, 0.4);
  }
`;

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children }) => (
    <StyledButton type="submit">
        {children}
    </StyledButton>
);