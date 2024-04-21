import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "./calender.css";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 80%;
`;

const ArticleList = styled.div`
  width: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 20px;
`;

const Article = styled.div`
  width: 200px;
  height: 150px;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

const Footer = styled.footer`
  width: 100%;
`;

const MainBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CalendarContainer = styled.div``;

const DateTitle = styled.h2`
  /* width: 200px; */
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 100%;
  background: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  width: 158px;
  padding: 15px 20px;
  text-align: center;
  cursor: pointer;
  color: ${(props) => (props.active ? "white" : "black")};
  background: ${(props) => (props.active ? "black" : "transparent")};
  &:hover {
    background: #e0e0e0;
  }
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
  const articles = [
    { date: "4/17", content: "Sample Content" },
    { date: "4/16", content: "Sample Content" },
    { date: "4/15", content: "Sample Content" },
    { date: "4/17", content: "Sample Content" },
    { date: "4/16", content: "Sample Content" },
    { date: "4/15", content: "Sample Content" },
  ];
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {}, [value]);

  return (
    <MainContainer>
      <Header>
        <NavBar>
          {categories.map((category) => (
            <NavItem
              key={category}
              active={category === activeCategory}
              onClick={() => setActiveCategory(category)}>
              {category}
            </NavItem>
          ))}
        </NavBar>
      </Header>
      <div style={{ height: "30px" }}></div>
      <MainBody>
        <CalendarContainer>
          <Calendar onChange={setValue} value={value} />
        </CalendarContainer>
        <div style={{ width: "30px" }}></div>
        <ArticleList>
          {articles.map((article, index) => (
            <Article key={index}>
              <DateTitle>{article.date}</DateTitle>
            </Article>
          ))}
        </ArticleList>
      </MainBody>
      <Footer>{/* 푸터 */}</Footer>
    </MainContainer>
  );
};

export default Main;
