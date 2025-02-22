import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import useOutSideClick from '@/hooks/useClickOutside';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  Container: styled.div`
    position: relative;
  `,
  DropDownBtn: styled.button`
    color: ${({ theme }) => theme.color.body};
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
  `,
  DropdownBox: styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2.7rem;
    gap: 0.6rem;
    z-index: 100;

    width: 100%;
    padding: 0.6rem;
    border: 1px solid ${({ theme }) => theme.color.gray};
    border-radius: 0.6rem;

    background-color: ${({ theme }) => theme.color.white};

    font-size: 1.4rem;

    box-shadow: 0 0.4rem 2rem 0 rgba(0, 0, 0, 0.08);

    ${MEDIA_QUERIES.onMobile} {
      font-size: 1.2rem;
    }
  `,
  DropDownList: styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.4rem;
    width: 100%;
    height: 100%;
    padding: 0.8rem 0;

    text-align: center;

    &:hover {
      background-color: ${({ theme }) => theme.color.mainLight};

      color: ${({ theme }) => theme.color.main};
      cursor: pointer;
    }
  `,
};

interface DropDownProps {
  userName: string;
}

function DropDown({ userName }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const optionAreaRef = useRef<HTMLUListElement>(null);

  const router = useRouter();

  useOutSideClick([optionAreaRef], () => {
    setIsOpen(false);
  });

  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleList = (path: string) => {
    router.push(path);
  };

  return (
    <S.Container>
      <S.DropDownBtn type="button" onClick={handleDropDown}>
        {userName}
      </S.DropDownBtn>
      {isOpen && (
        <S.DropdownBox ref={optionAreaRef}>
          <S.DropDownList onClick={() => handleList('/')}>
            로그아웃
          </S.DropDownList>
          <S.DropDownList onClick={() => handleList('/mypage')}>
            내 정보
          </S.DropDownList>
          <S.DropDownList onClick={() => handleList('/my-dashboard')}>
            내 대시보드
          </S.DropDownList>
        </S.DropdownBox>
      )}
    </S.Container>
  );
}

export default DropDown;
