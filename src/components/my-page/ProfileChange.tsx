import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { ImgFileUpload, imgUrlState } from '@/components/common/ImgFileUpload';
import FormInput from '@/components/common/form/Form';
import {
  profileImageUrlState,
  useMyPropfileQuery,
} from '@/hooks/query/users/useMyPropfileQuery';
import useProfileEditMutation from '@/hooks/query/users/useMyprofileEditMutation';
import {
  resultServerImgState,
  useProfileImgUploadMutation,
} from '@/hooks/query/users/useProfileImgUploadMutation';
import MEDIA_QUERIES from '@/constants/MEDIAQUERIES';

const S = {
  Container: styled.div`
    width: 62rem;
    height: 36rem;
    padding: 3.2rem 2.8rem 2.8rem 2.8rem;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.color.white};

    ${MEDIA_QUERIES.onMobile} {
      width: 28.4rem;
      height: 46.2rem;
    }
  `,
  AlignBox: styled.div`
    display: flex;
    align-items: center;
    margin: 3.2rem 0 2.4rem 0;

    ${MEDIA_QUERIES.onMobile} {
      flex-direction: column;
      align-items: normal;
      margin-top: 8rem;
    }
  `,
  ImageBox: styled.div`
    flex: 1;
    text-align: center;
  `,
  ImageTitle: styled.span`
    font-size: 2.4rem;
    font-weight: 700;
  `,
  ImageContent: styled.div`
    margin-top: -7rem;
  `,
  ImageText: styled.p`
    margin-top: 0.5rem;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.color.grayDark};

    ${MEDIA_QUERIES.onMobile} {
      font-size: 0.9rem;
      text-align: start;
    }
  `,
  InputBox: styled.div`
    flex: 2;
    margin-left: 1.6rem;

    ${MEDIA_QUERIES.onMobile} {
      margin-top: 2.4rem;
      margin-left: 0;
    }
  `,
};

function ProfileChange() {
  const imgServerUrl = useRecoilValue<string>(resultServerImgState);
  const setProfileImageUrl = useSetRecoilState(profileImageUrlState);
  const profileImageUrl = useRecoilValue(profileImageUrlState);
  const [profileInfo, setProfile] = useState({
    name: '',
    mail: '',
  });
  const { data: myProfile } = useMyPropfileQuery();
  const { mutate: editProfile } = useProfileEditMutation(imgServerUrl);

  setProfileImageUrl(myProfile && myProfile.profileImageUrl);

  const editMyProfile = (data, imgServerUrl) => {
    editProfile(data, imgServerUrl || profileImageUrl);
  };

  useEffect(() => {
    if (myProfile && myProfile.nickname && myProfile.email) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        name: myProfile.nickname,
        mail: myProfile.email,
      }));
    }
  }, [myProfile]);

  return (
    <S.Container>
      <S.ImageTitle>프로필</S.ImageTitle>
      <S.AlignBox>
        <S.ImageBox>
          <S.ImageContent>
            <ImgFileUpload edit={false} small={false} />
          </S.ImageContent>
          <S.ImageText>이미지를 클릭해 수정하세요</S.ImageText>
        </S.ImageBox>
        <S.InputBox>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <FormInput
            onSubmit={editMyProfile}
            profileInfo={profileInfo}
            formType="editProfile"
            btnSize="S"
          />
        </S.InputBox>
      </S.AlignBox>
    </S.Container>
  );
}

export default ProfileChange;
