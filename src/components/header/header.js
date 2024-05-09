import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <LeftContainer>
        <HeaderItem>으리으리 이야기</HeaderItem>/<HeaderItem>경신스</HeaderItem>
      </LeftContainer>
      <Logo>LOGO</Logo>
      <SubscribeButton onClick={() => {}}>
        [서비스 이름] 구독하기
      </SubscribeButton>
    </Container>
  );
};
export default Header;

const Container = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0.5px rgba(0, 0, 0, 0.1);
`;

const LeftContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const HeaderItem = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: black;
  cursor: pointer;
  &:hover {
    color: rgba(25, 25, 27, 0.5);
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SubscribeButton = styled.button`
  border-radius: 8px;
  background-color: black;
  color: white;
  font-size: 12px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }
`;
