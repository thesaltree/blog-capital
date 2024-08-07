'use client'

import React from 'react';
import styled from 'styled-components';

interface FormInputProps {
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    required?: boolean;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const StyledInput = styled.input`
  width: 100%;
  padding: 0.9rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.8);
  color: #2d3748;

  &:focus {
    outline: none;
    border-color: #3494e6;
    box-shadow: 0 0 0 3px rgba(52, 148, 230, 0.2);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const FormInput: React.FC<FormInputProps> = ({
        id,
        name,
        type,
        autoComplete,
        required = false,
        placeholder,
        value,
        onChange,
        className = '',
    }) => (
    <InputWrapper>
        <Label htmlFor={id}>{placeholder}</Label>
        <StyledInput
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            required={required}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
        />
    </InputWrapper>
);
