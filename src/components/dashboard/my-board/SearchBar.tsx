import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import { styled } from 'styled-components';
import handleEnterKeyDown from '@/utils/handleEnterKeyDown';
import SearchIcon from '@/public/icon/searchIcon.svg';

const S = {
  Container: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    padding: 0.8rem 1.6rem;
    border: ${({ theme }) => theme.border.lightGray};
    border-radius: 0.6rem;
    font-size: 1.6rem;

    &::placeholder {
      color: ${({ theme }) => theme.color.gray};
    }
  `,

  SearchInput: styled.input`
    width: 100%;
    border: none;
    font-size: 1.4rem;
  `,
};

interface SearchBarProps {
  placeholder: string;
  uri?: string;
  style?: React.CSSProperties;
}

function SearchBar({ placeholder, uri, style }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const navigateToKeyword = (input: string) => {
    const keyword = input?.replace(/(\s*)/g, '');
    if (keyword === '') return;

    router.push({
      pathname: uri,
      search: `?keyword=${keyword}`,
    });
  };

  return (
    <S.Container style={style}>
      <SearchIcon />
      <S.SearchInput
        type="text"
        ref={inputRef}
        placeholder={placeholder}
        onKeyDown={(e) =>
          handleEnterKeyDown(e, () =>
            navigateToKeyword(inputRef.current?.value || ''),
          )
        }
      />
    </S.Container>
  );
}

export default SearchBar;
