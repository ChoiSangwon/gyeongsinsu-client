import React,{useEffect} from "react";
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

  const articles=["2024-05-22", "2024-05-23", "2024-05-24", "2024-05-25", "2024-05-26", "2024-05-27", "2024-05-28", "2024-05-29", "2024-05-30", "2024-05-31", "2024-06-01", "2024-06-02", "2024-06-03", "2024-06-04", "2024-06-05", "2024-06-06", "2024-06-07", "2024-06-08", "2024-06-09", "2024-06-10", "2024-06-11", "2024-06-12"]

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
  const fetchData = async () => {
    const baseUrl = `${process.env.REACT_APP_API}news/date`;
    const params = {
        path: "date",
    };

    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        if (data.statusCode === 500) {
            return;
        }
        console.log(data)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
      fetchData();
  }, []);

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
                  handleArticleClick(article);
                }}>
                <ArticleSvg />
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

export default Main;

