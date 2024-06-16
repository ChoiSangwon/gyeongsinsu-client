import { useState } from "react";
import styled from "styled-components";
import Modal from "../modal/modal";
import { ReactComponent as LogoSvg } from "../../assets/logo.svg";

const Header = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
    };
    return (
        <Container>
            <LeftContainer>
                <HeaderItem
                    onClick={() => {
                        window.open("https://spectacled-goat-2e2.notion.site/d3c7e0857dc0453396aafc16f4278056?pvs=4", "_blank");
                    }}
                >
                    으리으리 이야기
                </HeaderItem>
            </LeftContainer>
            <Logo>
                <LogoSvg
                    onClick={() => {
                        window.location.href = "/";
                    }}
                    style={{ cursor: "pointer" }}
                />
            </Logo>
            <SubscribeButton onClick={handleModalOpen}>[세줄 경제] 구독하기</SubscribeButton>
            <Modal isOpen={modalOpen} onClose={handleModalClose} />
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
