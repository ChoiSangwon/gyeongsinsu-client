import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./calendar.css";
import CustomCalendar from "../../components/calendar/calendar";
import { useSetRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import { ReactComponent as MArticleSvg } from "../../assets/article-mobile.svg";
import { ReactComponent as MCalendarSvg } from "../../assets/calendar-mobile.svg";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const MobileHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
`;

const HeaderText = styled.h2`
  font-size: 20px;
  font-family: "UhBeeSe_hyun", sans-serif;
`;

const CustomText = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  font-family: "UhBeeSe_hyun", sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-align: right;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 100%;
`;

const MainBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const ArticleList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const ArticleContainer = styled.div`
  position: relative;
  text-align: center;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 160px;
  width: 100%;
  margin: 0 auto;
`;

const DateText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 14px;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  z-index: 10;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isVisible ? "block" : "none")};
  z-index: 5;
`;

const MobileMain = () => {
  const navigate = useNavigate();
  const setCalendarValue = useSetRecoilState(calendarValueState);
  const [articles, setArticles] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);

  const handleArticleClick = (date) => {
    const selectedDate = new Date(date);
    setCalendarValue(selectedDate);
    navigate("/board");
  };

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    fetchData();
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const separateDay = (date) => {
    const separated = date.split("-");
    return `${Number(separated[1])}월 ${Number(separated[2])}일`;
  };

  const fetchData = async () => {
    const baseUrl = `${process.env.REACT_APP_API}news/date`;
    const params = {
      path: "date",
    };

    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.statusCode === 500) {
        return;
      }
      setArticles(data.body.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <MainContainer>
      <MobileHeader>
        <HeaderText>날짜별 경신스</HeaderText>
        <MCalendarSvg
          onClick={handleDropdownToggle}
          style={{ cursor: "pointer" }}
        />
      </MobileHeader>
      <DropdownContainer ref={dropdownRef} isVisible={isDropdownVisible}>
        <CustomCalendar isMobile={true} />
      </DropdownContainer>
      <Overlay
        isVisible={isDropdownVisible}
        onClick={() => setIsDropdownVisible(false)}
      />
      <Content>
        <MainBody>
          <ArticleList>
            {articles.map((article, index) => (
              <ArticleContainer
                key={index}
                onClick={() => {
                  handleArticleClick(article);
                }}>
                <MArticleSvg />
                <CustomText>
                  {separateDay(article)}
                  <br /> 경신스
                </CustomText>
                <DateText>{article} 경신스</DateText>
              </ArticleContainer>
            ))}
          </ArticleList>
        </MainBody>
      </Content>
    </MainContainer>
  );
};

export default MobileMain;
