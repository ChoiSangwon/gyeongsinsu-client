import { useParams } from "react-router-dom";
import styled from "styled-components";

const ArticleDetail = () => {
    const { id } = useParams();

    // useEffect(() => {
    // }, [id]);

    return (
        <Layout>
            <MainContent>
                <Category>{"카테고리"}</Category>
                <div style={{ height: 40 }}></div>
                <Title>{"제목"}</Title>
                <div style={{ height: 8 }}></div>
                <Date>{"2024-10-12"}</Date>
                <div style={{ height: 40 }}></div>
                <Content>
                    {
                        "스크랩한 요약본이 들어갑니다\n스크랩한 요약본이 들어갑니다\n스크랩한 요약본이 들어갑니다\n스크랩한 요약본이 들어갑니다\n스크랩한 요약본이 들어갑니다\n스크랩한 요약본이 들어갑니다\n스크랩한 요약본이 들어갑니다"
                    }
                </Content>
                <div style={{ height: 40 }}></div>
                <LinkContent onClick={() => window.open("https://www.naver.com")}>{"원문 보러 가기"}</LinkContent>
                <div style={{ height: 60 }}></div>
                <FeedbackTitle>경신스에 대한 피드백을 남겨주세요</FeedbackTitle>
                <div style={{ height: 16 }}></div>
                <FeedbackContent />
                <div style={{ height: 24 }}></div>
                <SubscribeSection />
                <div style={{ height: 100 }}></div>
            </MainContent>
            <SubContent></SubContent>
        </Layout>
    );
};

const SubscribeSection = () => {
    return (
        <div style={{ border: "1px solid #a0a096" }}>
            <Title>{"경신스를 구독하세요"}</Title>
            <div style={{ height: 16 }}></div>
        </div>
    );
};

const FeedbackContent = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "200px",
                padding: "16px",
                fontSize: "20px",
                fontWeight: "400",
                resize: "none",
                border: "1px solid #000000",
                borderRadius: "8px",
                boxSizing: "border-box",
            }}
        >
            <FeedbackContentTextField />
            <div style={{ height: 24 }}></div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <FeedbackSubmitButton>{"전송"}</FeedbackSubmitButton>
            </div>
        </div>
    );
};

const MainContent = styled.div`
    width: 70%;
    float: left;
    border-right: 1px solid #e5e5e5;
    padding-right: 20px;
`;

const SubContent = styled.div`
    width: 30%;
    float: right;
`;

const Layout = styled.div`
    padding: 120px;
`;

const FeedbackContentTextField = styled.textarea`
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 0;
    resize: none;
`;

const FeedbackSubmitButton = styled.div`
    width: 60px;
    height: 40px;
    background-color: #000000;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
`;

const FeedbackTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

const LinkContent = styled.div`
    color: #000000;
    font-size: 20px;
    cursor: pointer;
    text-decoration: underline;
`;

const Date = styled.div`
    font-size: 20px;
`;

const Content = styled.div`
    font-size: 20px;
    font-weight: 400;
`;

const Category = styled.div`
    padding: 16px 10px;
    background-color: #000000;
    color: #ffffff;
    border-radius: 999px;
    display: inline-block;
    font-size: 16px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
`;

export default ArticleDetail;
