import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CustomCalendar from "../../components/calendar/calendar";
import { useRecoilValue } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import { activeCategoryState } from "../../atoms/activeCategoryState";
import { ReactComponent as CalendarIcon } from "../../assets/calendar-mobile.svg";
import SidebarMobile from "../../components/sidabar/sidebarMobile";
import { ReactComponent as RightButton } from "../../assets/pagenation/right.svg";
import { ReactComponent as LeftButton } from "../../assets/pagenation/left.svg";
import { ReactComponent as RightBlackButton } from "../../assets/pagenation/right-black.svg";
import { ReactComponent as LeftBlackButton } from "../../assets/pagenation/left-black.svg";
import SearchBarMobile from "../../components/searchBar/searchBarMobile";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
`;

const DateText = styled.h2`
  font-size: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const PostList = styled.div`
  width: 90%;
  margin: auto;
`;

const PostItem = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  margin: 10px 0;
  cursor: pointer;
  color: ${(props) => (props.isVisited ? "#888888" : "inherit")};
`;

const PostItemLeft = styled.div`
  flex-shrink: 0;
  width: 60px;
  padding-left: 1rem;
  font-weight: medium;
  font-size: 16px;
`;

const PostItemCenter = styled.div`
  flex-grow: 1;
  word-break: break-word;
  padding-right: 1rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  /* center */
  align-items: center;
`;

const PageButton = styled.div`
  padding: 5px 10px;
  margin: 0 5px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${(props) =>
    props.disabled
      ? `
        color: grey;
        cursor: not-allowed;
      `
      : null}

  ${(props) =>
    props.isCurrentPage
      ? `
        background: #007bff;
        color: white;
        border-radius: 5px;
      `
      : null}
`;

const CurrentPageInfo = styled.span`
  font-size: 16px;
  color: #666666;
  font-weight: 600;
`;

const TotalPageInfo = styled.span`
  font-size: 16px;
  color: #b2b2b2;
  font-weight: 400;
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

const PostsPerPage = 8;

function MobileBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNullData, setIsNullData] = useState(false);
  const navigate = useNavigate();
  const selectedDate = useRecoilValue(calendarValueState);
  const selectedCategory = useRecoilValue(activeCategoryState);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const fetchData = async () => {
    const baseUrl = `${process.env.REACT_APP_API}news`;
    const params = {
      path: "news",
      date: formatDate(selectedDate),
    };

    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    try {
      if (selectedDate.getDay() === 0) {
        setIsNullData(true);
        setPosts([]);
        return;
      }
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.statusCode === 500) {
        setIsNullData(true);
        setPosts([]);
        return;
      }
      setPosts(data.body);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsNullData(true);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setIsNullData(false);
    setCurrentPage(1);
    fetchData();
  }, [selectedDate]);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  function formatStringDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}.${month}.${day}`;
  }

  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;

  const [keyword, setKeyword] = useState("");

  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    setFilteredPosts(
      posts.filter((post) => selectedCategory === "전체" || selectedCategory.includes(post.category)).filter((post) => post.title.includes(keyword))
    );
  }, [posts, selectedCategory, keyword]);

  const currentPosts = Array.isArray(filteredPosts) ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePostClick = (post) => {
    const linkParts = post.link.split("/");
    const id = linkParts[linkParts.length - 1];

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    storedPosts.push(post.link);
    localStorage.setItem("posts", JSON.stringify(storedPosts));

    navigate(`/article/${id}?date=${formatDate(selectedDate)}`, {
      state: { post },
    });
  };

  const visitedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  const totalPages = Math.ceil(filteredPosts.length / PostsPerPage);

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
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const onChangeField = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <MainContainer>
      <Header>
        <DateText>{formatStringDate(selectedDate)} 경신스</DateText>
        <CalendarIcon onClick={handleDropdownToggle} style={{ cursor: "pointer" }} />
      </Header>
      <DropdownContainer ref={dropdownRef} isVisible={isDropdownVisible}>
        <CustomCalendar isMobile={true} />
      </DropdownContainer>
      <Overlay isVisible={isDropdownVisible} onClick={() => setIsDropdownVisible(false)} />
      <SidebarMobile />
      <Content>
        {loading ? (
          <h1>Loading</h1>
        ) : isNullData ? (
          <h1>해당 날짜의 기사가 존재하지 않습니다.</h1>
        ) : (
          <>
            <SearchBarMobile onChangeField={(e) => onChangeField(e)} />
            <MainBody>
              <PostList>
                {currentPosts.map((post, index) => (
                  <PostItem key={index} onClick={() => handlePostClick(post)} isVisited={visitedPosts.includes(post.link)}>
                    <PostItemLeft>{post.category}</PostItemLeft>
                    <PostItemCenter>{post.title}</PostItemCenter>
                  </PostItem>
                ))}
              </PostList>
              <Pagination>
                <PageButton onClick={() => paginate(currentPage - 1)}>
                  {currentPage === 1 ? <LeftButton width={24} height={24} /> : <LeftBlackButton width={24} height={24} />}
                </PageButton>
                <>
                  <CurrentPageInfo>{`${currentPage}`} </CurrentPageInfo>
                  <span>&nbsp;</span>
                  <TotalPageInfo>{` / ${totalPages}`}</TotalPageInfo>
                </>
                <PageButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredPosts.length / PostsPerPage)}>
                  {currentPage === Math.ceil(filteredPosts.length / PostsPerPage) ? (
                    <RightButton width={24} height={24} />
                  ) : (
                    <RightBlackButton width={24} height={24} />
                  )}
                </PageButton>
              </Pagination>
            </MainBody>
          </>
        )}
      </Content>
    </MainContainer>
  );
}

export default MobileBoard;
