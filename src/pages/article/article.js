import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

const ArticleDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const post = state?.post;

  useEffect(() => {}, []);

  if (!post) {
    return <div>Invalid post</div>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Layout>
        <MainContent>
          <Category>{post.category}</Category>
          <div style={{ height: 40 }}></div>
          <Title>{post.title}</Title>
          <div style={{ height: 8 }}></div>
          <SubTitle
            props
            location={"A1"}
            date={post.datetime}
            link={post.link}
          />
          <div style={{ height: 24 }}></div>
          <SummaryContent>
            <p>{`What: ${post.what}`}</p>
            <p>{`Why: ${post.why}`}</p>
            <p>{`How: ${post.how}`}</p>
          </SummaryContent>
          <div style={{ height: 100 }}></div>
        </MainContent>
        <Divider />
        <SubContent>
          <Title>{"메모장"}</Title>
          <Memo />
        </SubContent>
      </Layout>
    </div>
  );
};

const Header = () => {
  return (
    <div
      style={{
        background: "#474747",
        height: 80,
        alignItems: "center",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "120px",
      }}>
      <div
        style={{
          fontSize: 16,
          marginRight: 20,
          color: "#FFFFFF",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "12px",
        }}
        onClick={() => window.history.back()}>
        <img src="/icons/chevron-left.svg" alt="logo" />
        <p style={{ margin: 0 }}>{"이전글"}</p>
      </div>
      <div
        style={{
          fontSize: 16,
          marginRight: 20,
          color: "#FFFFFF",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "12px",
        }}
        onClick={() => (window.location.href = "/")}>
        <img src="/icons/list.svg" alt="logo" />
        <div width="8px" height="1px" />
        <p position="relative">{"목록"}</p>
      </div>
      <div
        style={{
          fontSize: 16,
          marginRight: 20,
          color: "#FFFFFF",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "12px",
        }}>
        <p style={{ margin: 0 }}>{"다음글"}</p>
        <img src="/icons/chevron-right.svg" alt="logo" />
      </div>
    </div>
  );
};

const Memo = () => {
  return (
    <FeedbackContentTextField
      placeholder={"이 기사에서 기억하고 싶은 내용을 간단히 메모해보세요!"}
    />
  );
};

const SubTitle = ({ location, date, link }) => {
  return (
    <div
      style={{ display: "flex", alignContent: "center", alignItems: "center" }}>
      <div style={{ fontSize: 14, color: "#ADADAD" }}>{location}면</div>
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
      <div style={{ fontSize: 14, color: "#ADADAD" }}>{date}</div>
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
        onClick={() => window.open(link)}
        style={{
          fontSize: 12,
          color: "#6C6C6C",
          borderRadius: "999px",
          alignContent: "center",
          border: "1px solid #ececec",
          padding: "4px 8px",
          cursor: "pointer",
        }}>
        {"기사 원문"}
      </div>
    </div>
  );
};

const MainContent = styled.div`
  width: calc(70% - 20px);
  padding: 120px 0;
`;

const Divider = styled.div`
  width: 1px;
  margin: 0 20px;
  color: #cbd5e1;
  /* height: 100%; */
  background-color: #cbd5e1;
  display: inline-block;
`;

const SubContent = styled.div`
  width: calc(30% - 20px);
  padding: 120px 0;
`;

const Layout = styled.div`
  display: flex;
  padding: 0 120px;
  height: calc(100% - 80px);
`;

const FeedbackContentTextField = styled.textarea`
  resize: none;
  width: 100%;
  height: 260px;
  border: 1px solid #cbd5e1;
  padding: 16px;
  margin: 0;
  border-radius: 12px;
`;

const SummaryContent = styled.div`
  max-width: 100%;
  border-radius: 12px;
  background: #f7f7f7;
  padding: 20px 24px;
`;

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
