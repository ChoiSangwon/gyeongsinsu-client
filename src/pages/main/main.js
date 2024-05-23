import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./calender.css";
import CustomCalendar from "../../components/calendar/calendar";
import SideBar from "../../components/sidabar/sidebar";
import { useSetRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
`;

const SideBarContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-left: 20px;
`;

const MainBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ArticleList = styled.div`
  width: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 20px;
`;

const Article = styled.div`
  background: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const Main = () => {
  const navigate = useNavigate();
  const setCalendarValue = useSetRecoilState(calendarValueState);

  const articles = [
    { date: "2024-05-23", content: "Sample Content" },
    { date: "2024-05-22", content: "Sample Content" },
    { date: "2024-05-21", content: "Sample Content" },
    { date: "2024-05-20", content: "Sample Content" },
    { date: "2024-05-19", content: "Sample Content" },
    { date: "2024-05-18", content: "Sample Content" },
  ];

  const handleArticleClick = (date) => {
    const selectedDate = new Date(date);
    console.log(date);
    console.log(selectedDate);
    setCalendarValue(selectedDate);
    navigate("/board");
  };
  return (
    <MainContainer>
      <SideBarContainer>
        <SideBar />
        <CustomCalendar />
      </SideBarContainer>
      <Content>
        <MainBody>
          <ArticleList>
            {articles.map((article, index) => (
              <Article
                key={index}
                onClick={() => {
                  handleArticleClick(article.date);
                }}>
                <h2>{article.date}</h2>
              </Article>
            ))}
          </ArticleList>
        </MainBody>
      </Content>
    </MainContainer>
  );
};

export default Main;
