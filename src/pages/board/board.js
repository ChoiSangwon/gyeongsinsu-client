import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/sidabar/sidebar";
import CustomCalendar from "../../components/calendar/calendar";
import { useRecoilValue } from "recoil";
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
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

const PostList = styled.div`
  width: 80%;
  margin: auto;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  margin: 10px 0;
  cursor: pointer;
`;

const PostItemLeft = styled.div`
  padding-left: 1rem;
  padding-right: 4rem;
`;

const PostItemCenter = styled.div`
  flex-grow: 1;
  justify-content: start;
`;

const PostItemRight = styled.div`
  color: rgba(173, 173, 173, 1);
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PostsPerPage = 8;

function Board() {
  const [currentPage, setCurrentPage] = useState(1);
  const value = useRecoilValue(calendarValueState);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const baseUrl =
      "https://eja3ysxk64.execute-api.ap-northeast-2.amazonaws.com/v1/news";
    const params = {
      path: "news",
      date: formatDate(value),
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
      setPosts(data.body);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [value]);
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }
  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePostClick = (post) => {
    const linkParts = post.link.split("/");
    const id = linkParts[linkParts.length - 1];
    navigate(`/article/${id}`, { state: { post } });
  };

  return (
    <MainContainer>
      <SideBarContainer>
        <SideBar />
        <CustomCalendar />
      </SideBarContainer>
      <Content>
        {loading ? (
          <div>Loading</div>
        ) : (
          <MainBody>
            <PostList>
              {currentPosts.map((post, index) => (
                <PostItem key={index} onClick={() => handlePostClick(post)}>
                  <PostItemLeft></PostItemLeft>
                  <PostItemCenter>{post.title}</PostItemCenter>
                  <PostItemRight>{post.datetime}</PostItemRight>
                </PostItem>
              ))}
            </PostList>
            <Pagination>
              {Array.from({
                length: Math.ceil(posts.length / PostsPerPage),
              }).map((_, i) => (
                <PageButton key={i} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </PageButton>
              ))}
            </Pagination>
          </MainBody>
        )}
      </Content>
    </MainContainer>
  );
}

export default Board;
