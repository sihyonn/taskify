import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useOutSideClick from '@/hooks/useClickOutside';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';
import ArrowIcon from '@/public/icon/arrowButton.svg';
import CheckIcon from '@/public/icon/checkIcon.svg';

const S = {
  InputContainer: styled.div`
    position: relative;
    display: inline-block;
  `,
  Input: styled.input<{ $isFocused: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 22.7rem;
    height: 4.8rem;
    padding: 1.5rem 3.2rem 1.4rem 1.6rem;
    border-radius: 0.6rem;
    border: 1px solid
      ${(props) =>
        props.$isFocused
          ? props.theme.color.main
          : props.theme.color.grayLight};
    outline: none;
    background: ${({ theme }) => theme.color.white};

    ${MEDIA_QUERIES.onTablet} {
      width: 21.7rem;
    }

    ${MEDIA_QUERIES.onMobile} {
      width: 32.7rem;
      padding: 1.3rem 3.2rem 1.2rem 1.6rem;
    }

    &:focus {
      border-color: ${({ theme }) => theme.color.main};
    }
  `,
  ArrowIcon: styled(ArrowIcon)`
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
  `,
  OptionArea: styled.ul`
    position: absolute;
    width: 22.7rem;
    border-radius: 0.6rem;
    border: 1px solid ${({ theme }) => theme.color.grayLight};
    background: ${({ theme }) => theme.color.white};
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08);
    margin-top: 0.2rem;

    ${MEDIA_QUERIES.onTablet} {
      width: 21.7rem;
    }

    ${MEDIA_QUERIES.onMobile} {
      width: 32.7rem;
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
    padding: 1rem;
    font-size: 1.6rem;
    font-weight: 400;

    color: ${({ theme }) => theme.color.body};
    margin-left: ${(props) => (props.$isCheckIcon ? '' : '2rem')};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  CheckIcon: styled(CheckIcon)`
    width: 2rem;
    height: 2rem;
  `,
};

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  options: Option[];
  placeholder: boolean;
}

function SelectBox({ options, placeholder }: SelectBoxProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [filterText, setFilterText] = useState('');
  const optionAreaRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelectOption(option: Option): void {
    setSelectedOption(option);
    setFilterText('');
    setIsFocused(false);
    console.log('선택된 텍스트 값:', option.value);
  }

  useOutSideClick([optionAreaRef, inputRef], () => {
    setIsFocused(false);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    setSelectedOption(null);
  };

  const handleInputClick = () => {
    setIsFocused(true);
  };

  return (
    <S.InputContainer>
      <S.Input
        ref={inputRef}
        type="text"
        value={selectedOption ? selectedOption.label : filterText}
        onChange={handleInputChange}
        onFocus={handleInputClick}
        $isFocused={isFocused}
        placeholder={placeholder ? '이름을 입력해 주세요' : ''}
      />
      <S.ArrowIcon />
      {isFocused && (
        <S.OptionArea ref={optionAreaRef}>
          {options
            .filter((option) =>
              option.label.toLowerCase().includes(filterText.toLowerCase()),
            )
            .map((option) => (
              <S.OptionValue
                key={option.value}
                onClick={() => handleSelectOption(option)}
              >
                {option.value === (selectedOption?.value || '') && (
                  <S.CheckIcon />
                )}
                <S.OptionValueText
                  $isCheckIcon={option.value === (selectedOption?.value || '')}
                >
                  {option.label}
                </S.OptionValueText>
              </S.OptionValue>
            ))}
        </S.OptionArea>
      )}
    </S.InputContainer>
  );
}

export default SelectBox;
