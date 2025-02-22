import { useState } from 'react';
import { styled } from 'styled-components';
import DateSelector from '@/components/common/DateSelector';
import { ImgFileUpload } from '@/components/common/ImgFileUpload';
import SelectBox from '@/components/common/SelectBox';
import Button from '@/components/common/button/Button';
import BackDropModal from '@/components/common/modal/BackDropModal';
import HashTag from '@/components/common/tag/HashTag';
import { formatDueDate } from '@/utils/formatDate';
import useEditCardMutation from '@/hooks/query/cards/useEditCardMutation';
import useColumnListQuery from '@/hooks/query/columns/useColumnListQuery';
import useMemeberListQuery from '@/hooks/query/members/useMemeberListQuery';
import { BUTTON_TYPE } from '@/constants/BUTTON_TYPE';
import { RequiredStar } from '@/styles/CommonStyle';

const S = {
  Title: styled.h1`
    font-size: 2.4rem;
    font-weight: 700;
  `,

  FormContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2.8rem;
    margin-top: 2.4rem;

    @media screen and (min-width: 768px) {
      width: 46rem;
      margin-top: 3.2rem;
    }
  `,

  Low: styled.div`
    display: flex;
    justify-content: space-between;
  `,

  FieldBox: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  Label: styled.label`
    font-size: 1.7rem;
    font-weight: 500;

    &.required {
      ${RequiredStar('after')}
    }

    @media screen and (max-width: 768px) {
      font-size: 1.6rem;
    }
  `,

  Input: styled.input`
    width: 100%;
    height: 4.8rem;
    padding: 1.6rem;
    border: ${({ theme }) => theme.border.lightGray};
    border-radius: 0.4rem;
    font-size: 1.6rem;

    &::placeholder {
      color: ${({ theme }) => theme.color.gray};
    }

    @media screen and (max-width: 768px) {
      font-size: 1.4rem;
    }
  `,

  Textarea: styled.textarea`
    min-height: 10rem;
    padding: 1.6rem;
    border: ${({ theme }) => theme.border.lightGray};
    border-radius: 0.4rem;
    font-size: 1.6rem;

    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.color.gray};
    }

    @media screen and (max-width: 768px) {
      font-size: 1.4rem;
    }
  `,

  ButtonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.2rem;

    margin-top: 2.8rem;
  `,

  Tag: styled(HashTag)`
    display: flex;

    &button {
      margin-left: 1rem;
    }
  `,
};

function ToDoEditModal({
  isOpen,
  onClose,
  id: cardId,
  dashboardId,
  columnId,
  title,
  description,
  dueDate,
  tags,
  assignee,
  imageUrl,
}: any) {
  const [toDoInfo, setToDoInfo] = useState({
    columnId,
    assigneeUserId: assignee.id,
    title,
    description,
    dueDate,
    tags,
    imageUrl,
  });
  const dashId = Number(dashboardId);

  const { data: membersData } = useMemeberListQuery(dashboardId);
  const assigneeOptions = membersData?.members;
  const { data: stateOptions } = useColumnListQuery(dashId);
  const { mutate: editMutate } = useEditCardMutation(onClose, cardId);

  const isFilledRequiredFields = () => {
    return toDoInfo.title.trim() && toDoInfo.description.trim();
  };

  const handleOnChange = (fieldName: string, value: string | string[]) => {
    setToDoInfo((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag) {
        setToDoInfo((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
        e.currentTarget.value = ''; // 입력초기화
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setToDoInfo((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (url: string) => {
    setToDoInfo((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleEditBtnClick = () => {
    editMutate(toDoInfo);
  };

  return (
    <BackDropModal isOpen={isOpen} onClose={onClose}>
      <S.Title>📌 할 일 수정</S.Title>
      <S.FormContainer>
        <S.Low>
          <S.FieldBox>
            <S.Label>상태</S.Label>
            <SelectBox
              // initialValue={assignee} // 컬럼명이들어가야함
              options={stateOptions}
              placeholder={false}
              onChange={(option) => handleOnChange('columnId', option.id)}
              displayFieldName="title"
            />
          </S.FieldBox>
          <S.FieldBox>
            <S.Label>담당자</S.Label>
            <SelectBox
              // initialValue={assignee}
              options={assigneeOptions}
              placeholder={false}
              onChange={(option) =>
                handleOnChange('assigneeUserId', option.userId)
              }
              displayFieldName="nickname"
            />
          </S.FieldBox>
        </S.Low>

        <S.FieldBox>
          <S.Label htmlFor="title" className="required">
            제목
          </S.Label>
          <S.Input
            id="title"
            type="text"
            value={toDoInfo.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange('title', e.target.value)
            }
          />
        </S.FieldBox>

        <S.FieldBox>
          <S.Label htmlFor="description" className="required">
            설명
          </S.Label>
          <S.Textarea
            id="description"
            value={toDoInfo.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleOnChange('description', e.target.value)
            }
          />
        </S.FieldBox>

        <S.FieldBox>
          <S.Label>마감일</S.Label>
          <DateSelector
            value={formatDueDate(toDoInfo.dueDate)}
            onChange={(date) => {
              handleOnChange('dueDate', formatDueDate(date));
            }}
          />
        </S.FieldBox>

        <S.FieldBox>
          <S.Label htmlFor="tag">태그</S.Label>
          <S.Input
            id="tag"
            type="text"
            placeholder="태그 입력후 Enter!"
            onKeyPress={handleTagInput}
          />
        </S.FieldBox>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          {toDoInfo.tags.map((tag, index) => (
            <S.Tag key={index} index={index}>
              {tag}
              <button
                onClick={() => removeTag(tag)}
                style={{ marginLeft: '0.05rem' }}
              >
                X
              </button>
            </S.Tag>
          ))}
        </div>

        <S.FieldBox>
          <S.Label>이미지</S.Label>
          <ImgFileUpload edit small onImageUpload={handleImageUpload} />
        </S.FieldBox>
      </S.FormContainer>

      <S.ButtonContainer>
        <Button styleType={BUTTON_TYPE.SECONDARY} onClick={onClose}>
          취소
        </Button>
        <Button
          disabled={!isFilledRequiredFields()}
          onClick={handleEditBtnClick}
        >
          수정
        </Button>
      </S.ButtonContainer>
    </BackDropModal>
  );
}

export default ToDoEditModal;
