import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ArrowIcon from '@/public/icon/arrowButton.svg';
import CheckIcon from '@/public/icon/checkIcon.svg';

const BREAKPOINT_MOBILE = 768;

const onMobile = `@media only screen and (max-width: ${BREAKPOINT_MOBILE}px)`;

const S = {
  SelectBox: styled.div<{ $isFocused: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 13.5625rem;
    height: 3rem;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid
      ${(props) =>
        props.$isFocused
          ? props.theme.color.main
          : props.theme.color.grayLight};
    outline: none;
    background: ${({ theme }) => theme.color.white};

    ${onMobile} {
      width: 20.4375rem;
    }

    &:focus-within {
      border-color: ${({ theme }) => theme.color.main};
    }
  `,
  Text: styled.div<{ $gray?: boolean }>`
    flex: 3;
    overflow: hidden;

    margin: 0 0.625rem 0 0.625rem;

    white-space: nowrap;
    text-overflow: ellipsis;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    color: ${(props) =>
      props.$gray ? props.theme.color.gray : props.theme.color.body};
  `,
  Title: styled.p`
    margin-bottom: 0.63rem;

    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${({ theme }) => theme.color.body};
  `,
  OptionArea: styled.ul`
    width: 13.5625rem;
    border-radius: 0.375rem;
    border: 1px solid ${({ theme }) => theme.color.grayLight};
    background: ${({ theme }) => theme.color.white};
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
    margin-top: 0.0625rem;

    ${onMobile} {
      width: 20.4375rem;
    }
  `,
  OptionValue: styled.li`
    display: flex;
    align-items: center;
    padding: 0.5rem;

    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.color.mainLight};
      transition: background-color 0.1s ease-in-out;
    }
  `,
  OptionValueText: styled.p<{ $isCheckIcon: boolean }>`
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    color: ${({ theme }) => theme.color.body};
    margin-left: ${(props) => (props.$isCheckIcon ? '0.6rem' : '2rem')};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  CheckIcon: styled(CheckIcon)`
    width: 1.375rem;
    height: 1.375rem;
  `,
};

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  title: string;
  options: Option[];
  whether: boolean;
}

function SelectBox({ title, options, whether }: SelectBoxProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const optionAreaRef = useRef<HTMLUListElement>(null);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  function handleSelectOption(option: Option): void {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        optionAreaRef.current &&
        !optionAreaRef.current.contains(event.target as Node) &&
        selectBoxRef.current &&
        !selectBoxRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // whether가 false이고 선택된 옵션이 없으면 첫 번째 옵션을 선택한다.
  if (!whether && !selectedOption && options.length > 0) {
    setSelectedOption(options[0]);
  }

  return (
    <>
      <S.Title>{title}</S.Title>
      <S.SelectBox
        ref={selectBoxRef}
        tabIndex={0}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        $isFocused={isFocused}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <S.Text $gray={whether && !selectedOption}>
          {selectedOption || whether
            ? selectedOption?.label || '이름을 입력해 주세요'
            : ''}
        </S.Text>
        <ArrowIcon />
      </S.SelectBox>
      {isDropdownOpen && (
        <S.OptionArea ref={optionAreaRef}>
          {options.map((option) => (
            <S.OptionValue
              key={option.value}
              onClick={() => handleSelectOption(option)}
            >
              {option.value === selectedOption?.value && <S.CheckIcon />}
              <S.OptionValueText
                $isCheckIcon={option.value === selectedOption?.value}
              >
                {option.label}
              </S.OptionValueText>
            </S.OptionValue>
          ))}
        </S.OptionArea>
      )}
    </>
  );
}

export default SelectBox;
