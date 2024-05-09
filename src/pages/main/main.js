import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import Calendar from "react-calendar";
import "./calender.css";
import { ReactComponent as ChevronBottom } from "../../assets/chevron-bottom.svg";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
`;

const SideBar = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  /* background: #f0f0f0; */
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  padding: 15px 10px;
  margin: 5px 0;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? "black" : "rgba(173, 173, 173, 1)")};
  /* background: ${(props) => (props.active ? "black" : "transparent")}; */
  &:hover {
    background: #e0e0e0;
  }
`;

const CategoryButton = styled.div`
  padding: 15px 10px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  /* text-align: center; */
  /* background: #d0d0d0; */
  &:hover {
    background: #c0c0c0;
  }
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

const CalendarContainer = styled.div``;

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
  const categories = [
    "오늘의 경제",
    "정치",
    "경제",
    "사회",
    "생활/문화",
    "IT/과학",
    "세계",
  ];
  const [activeCategory, setActiveCategory] = useState("");
  const [value, setValue] = useState(new Date());
  const [showCategories, setShowCategories] = useState(false);
  const articles = [
    { date: "4/17", content: "Sample Content" },
    { date: "4/16", content: "Sample Content" },
    { date: "4/15", content: "Sample Content" },
    { date: "4/17", content: "Sample Content" },
    { date: "4/16", content: "Sample Content" },
    { date: "4/15", content: "Sample Content" },
  ];

  return (
    <MainContainer>
      <SideBar>
        <CategoryButton onClick={() => setShowCategories(!showCategories)}>
          카테고리
          <ChevronBottom />
        </CategoryButton>
        {showCategories &&
          categories.map((category) => (
            <NavItem
              key={category}
              active={category === activeCategory}
              onClick={() => {
                if (category === activeCategory) {
                  setActiveCategory("");
                } else {
                  setActiveCategory(category);
                }
              }}>
              {category}
            </NavItem>
          ))}
        <CalendarContainer>
          <Calendar
            onChange={setValue}
            value={value}
            formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
            calendarType="gregory" // 일요일 부터 시작
            showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
          />
        </CalendarContainer>
      </SideBar>
      <Content>
        <MainBody>
          <ArticleList>
            {articles.map((article, index) => (
              <Article key={index}>
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
