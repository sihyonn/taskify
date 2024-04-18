import { styled } from 'styled-components';
import DashBoardHeader from '@/components/common/DashBoardHeader';
import Sidebar from '@/components/common/SideBar';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  Container: styled.div`
    display: flex;
  `,
  MainSection: styled.div``,
  ContentBox: styled.div`
    background-color: ${({ theme }) => theme.color.background};
    width: 100vw;
    height: 100%;

    margin-top: 7rem;

    ${MEDIA_QUERIES.onMobile} {
      margin-top: 6rem;
    }
  `,
};

const dashboards = [
  { id: '1', color: '#FFA500', name: '대시보드 1', createdByMe: true },
  { id: '2', color: '#FF2660', name: '대시보드 2', createdByMe: true },
  { id: '3', color: '#7AC555', name: '대시보드 3', createdByMe: false },
];
const MY_IMAGE_URL = 'https://i.ibb.co/ysRQMyj/me.jpg';
const invitedUsers = [
  'https://i.ibb.co/kgykYbx/Ellipse-40.png',
  'https://i.ibb.co/tPyNYb1/Ellipse-38.png',
  'https://i.ibb.co/VgZHtYL/Ellipse-39.png',
];

function Layout({ children }: any) {
  return (
    <S.Container>
      <Sidebar dashboards={dashboards} />
      <S.MainSection>
        <DashBoardHeader
          menuName={'내 대시보드'}
          profileName={'남현준'}
          profileImgURL={MY_IMAGE_URL}
          invitedUsers={invitedUsers}
        />
        <S.ContentBox>{children}</S.ContentBox>
      </S.MainSection>
    </S.Container>
  );
}

export default Layout;
