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
                <SubTitle props location={"A1"} date={"2024.05.08"} link={"https://www.naver.com"} />
                <div style={{ height: 24 }}></div>
                <SummaryContent>{"- 요약1\n- 요약 2\n- 요약 3"}</SummaryContent>
                <div style={{ height: 100 }}></div>
            </MainContent>
            <SubContent>
                <Title>{"메모장"}</Title>
                <Memo />
            </SubContent>
        </Layout>
    );
};

const Memo = () => {
    return <div style={{ maxWidth: "100%" }}>{"이 기사에서 기억하고 싶은 내요응ㄹ 간단히 메모해보세요."}</div>;
};

const SubTitle = (props) => {
    return (
        <div style={{ display: "flex", alignContent: "center" }}>
            <div style={{ fontSize: 14, color: "#ADADAD" }}>{props.location}면</div>
            <div style={{ width: 8 }}></div>
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ECECEC",
                }}
            />
            <div style={{ width: 8 }}></div>
            <div style={{ fontSize: 14, color: "#ADADAD" }}>{props.date}</div>
            <div style={{ width: 8 }}></div>
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ECECEC",
                }}
            />
            <div style={{ width: 8 }}></div>
            <div
                onClick={() => window.open(props.link)}
                style={{
                    fontSize: 12,
                    color: "#6C6C6C",
                    borderRadius: "999px",
                    alignContent: "center",
                    border: "1px solid #ececec",
                    padding: "4px 8px",
                    cursor: "pointer",
                }}
            >
                {"기사 원문"}
            </div>
        </div>
    );
};

const MainContent = styled.div`
    width: calc(70% - 20px);
    float: left;
    border-right: 1px solid #e5e5e5;
    padding-right: 20px;
`;

const SubContent = styled.div`
    width: calc(30% - 20px);
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

const SummaryContent = (props) => {
    return (
        <div style={{ maxWidth: "100%", borderRadius: "12px", background: "#f7f7f7", padding: "20px 24px" }}>
            <div>{"📝 경신의 세 줄 요약"}</div>
            <div>{props.children}</div>
        </div>
    );
};

const Category = styled.div`
    padding: 16px 10px;
    background-color: #ffffff;
    color: #000000;
    border-radius: 12px;
    display: inline-block;
    font-size: 16px;
    border: 1px solid #000000;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
`;

export default ArticleDetail;
