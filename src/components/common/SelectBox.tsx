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
    overflow-y: auto;
    max-height: 23rem;

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
  id: number;
  [key: string]: unknown;
}
interface SelectBoxProps {
  options: Option[];
  placeholder: boolean;
  onChange: (option: Option) => void;
  displayFieldName: string;
  initialValue?: Option;
}

function SelectBox({
  options,
  placeholder,
  onChange,
  displayFieldName,
  initialValue,
}: SelectBoxProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [filterText, setFilterText] = useState('');
  const optionAreaRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelectOption(option): void {
    setSelectedOption(option);
    setFilterText('');
    setIsFocused(false);
    onChange(option);
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
        value={
          initialValue && !isFocused // 초기값이 있고, 인풋에 포커스가 되어 있지 않을 때 초기값을 보여줍니다.
            ? initialValue[displayFieldName]
            : selectedOption // 그렇지 않으면 기존 로직을 따릅니다.
              ? selectedOption[displayFieldName]
              : filterText
        }
        onChange={handleInputChange}
        onFocus={handleInputClick}
        $isFocused={isFocused}
        placeholder={placeholder ? '이름을 입력해 주세요' : ''}
      />
      <S.ArrowIcon />
      {isFocused && (
        <S.OptionArea ref={optionAreaRef}>
          {options
            ?.filter(
              (option) =>
                typeof option[displayFieldName] === 'string' &&
                option[displayFieldName]
                  .toLowerCase()
                  .includes(filterText.toLowerCase()),
            )
            ?.map((option) => (
              <S.OptionValue
                key={option.id}
                onClick={() => handleSelectOption(option)}
              >
                {option.id === (selectedOption?.id || 0) && <S.CheckIcon />}
                <S.OptionValueText
                  $isCheckIcon={option.id === (selectedOption?.id || 0)}
                >
                  {option[displayFieldName]}
                </S.OptionValueText>
              </S.OptionValue>
            ))}
        </S.OptionArea>
      )}
    </S.InputContainer>
  );
}

export default SelectBox;
