import React, { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
`;

const Heading = styled.div`
  font-size: 24px;
  margin: 0;
  font-weight: bold;
`;

const SubHeading = styled.div`
  font-size: 18px;
  margin: 0;
  font-weight: bold;
`;

const EmailInput = styled.input`
  width: 380px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 14px;
  color: gray;
`;

const SubscribeButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Modal = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        <Heading>매일 아침 7시,</Heading>
        <Heading>경제 소식 요약을 메일함에서 받아보세요.</Heading>
        <div style={{ marginBottom: "30px" }}></div>
        <SubHeading>이메일</SubHeading>
        <div style={{ marginBottom: "10px" }}></div>
        <EmailInput type="email" placeholder="example@3lineseconomy.com" />
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            required
          />
          <Label>
            (필수) 개인정보 수집/이용 및 광고성 정보 수신에 동의합니다.
          </Label>
        </CheckboxContainer>
        <SubscribeButton
          onClick={() => {
            // TODO 구독 api 연결하기
            onClose();
          }}
          disabled={!isChecked}>
          세줄 경제 무료로 구독하기
        </SubscribeButton>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
