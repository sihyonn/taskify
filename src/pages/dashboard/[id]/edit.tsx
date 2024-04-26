import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/button/Button';
import TeamMemberInviteModal from '@/components/common/modal/TeamMemberInviteModal';
import InviteHistoryList from '@/components/edit-page/InviteHistoryListBox';
import MemberList from '@/components/edit-page/MemberListBox';
import NameAndColorChangeBox from '@/components/edit-page/NameAndColorChangeBox';
import BackButton from '@/components/my-page/BackButton';
import PageLayout from '@/components/template/PageLayout';
import useCancelInvitationMutation from '@/hooks/query/dashboards/useCancelInvitationMutation';
import useDeleteDashboardMutation from '@/hooks/query/dashboards/useDeleteDashboardMutation';
import useInviteDashboardMutation from '@/hooks/query/dashboards/useInviteDashboardMutation';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  MainContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  `,
  Button: styled(Button)`
    width: 62rem;
    margin-top: 3rem;
    ${MEDIA_QUERIES.onMobile} {
      width: calc(100% - 10px);
    }
  `,
};
function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { mutate: responseDeleteDashboardMutate } =
    useDeleteDashboardMutation();

  const openInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  // const handleCreateInvitation = () => {};

  const handleDeleteDashboard = () => {
    responseDeleteDashboardMutate(id);
  };
  return (
    <PageLayout openInviteModal={openInviteModal} myPage={false}>
      <S.MainContainer>
        <BackButton />
        <NameAndColorChangeBox />
        <MemberList />
        <InviteHistoryList openInviteModal={openInviteModal} />
        <TeamMemberInviteModal
          isOpen={isInviteModalOpen}
          onClose={closeInviteModal}
          onSubmit={() => {
            console.log(`api`);
          }}
        />
        <S.Button onClick={handleDeleteDashboard}>대시보드 삭제하기</S.Button>
      </S.MainContainer>
    </PageLayout>
  );
}

export default Edit;
