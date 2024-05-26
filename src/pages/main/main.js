import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./calender.css";
import CustomCalendar from "../../components/calendar/calendar";
import SideBar from "../../components/sidabar/sidebar";
import { useSetRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import { ReactComponent as ArticleSvg } from "../../assets/article.svg";

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

const CustomText = styled.div`
  position: absolute;
  right: 20px;
  top: 15px;
  color: white;
  font-family: "UhBeeSe_hyun", sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-align: right;
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

const ArticleContainer = styled.div`
  position: relative;
  text-align: center;
  cursor: pointer;
`;

const DateText = styled.div`
  position: absolute;
  bottom: 15px;
  left: 20px;
  font-size: 16px;
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

  const separateDay = (date) => {
    const separated = date.split("-");
    return `${Number(separated[1])}월 ${Number(separated[2])}일`;
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
              <ArticleContainer
                key={index}
                onClick={() => {
                  handleArticleClick(article.date);
                }}>
                <ArticleSvg />
                <CustomText>
                  {separateDay(article.date)}
                  <br /> 경신스
                </CustomText>
                <DateText>{article.date} 경신스</DateText>
              </ArticleContainer>
            ))}
          </ArticleList>
        </MainBody>
      </Content>
    </MainContainer>
  );
};

export default Main;
