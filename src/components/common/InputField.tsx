import React from 'react';
import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const S = {
  Layout: styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  `,
  Label: styled.label`
    color: ${({ theme }) => theme.color.body};
    font-size: 1.6rem;
    font-weight: 400;
  `,
  Input: styled.input`
    display: flex;
    align-items: center;
    gap: 1rem;

    width: 100%;
    padding: 1.5rem 1.6rem;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.color.grayLight};
    background: ${({ theme }) => theme.color.white};

    &::placeholder {
      color: ${({ theme }) => theme.color.gray};
      font-size: 1.6rem;
      font-weight: 400;
    }

    &:focus {
      border: 1px solid ${({ theme }) => theme.color.purple};
    }
  `,
};

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

/**
 * @component
 * @param label - label 이름 (이메일, 제목 ...)
 * @param id - label, input 연결용 id (input, title ...)
 * @param type - input 타입 (email, text ...)
 * @param placeholder - placeholder
 */

// React.forwardRef 추가
const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, ...htmlInputProps }, ref) => {
    return (
      <S.Layout>
        <S.Label htmlFor={id}>{label}</S.Label>
        <S.Input ref={ref} id={id} {...htmlInputProps} />
      </S.Layout>
    );
  },
);

InputField.displayName = 'InputField'; // 디버깅을 위해 displayName 설정

export default InputField;
