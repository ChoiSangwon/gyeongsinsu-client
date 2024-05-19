import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "../../components/sidabar/sidebar";
import CustomCalendar from "../../components/calendar/calendar";

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

const posts = Array.from({ length: 50 }, (_, i) => `게시글 ${i + 1}`);

const PostsPerPage = 8;

function Board() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainContainer>
      <SideBarContainer>
        <SideBar />
        <CustomCalendar />
      </SideBarContainer>
      <Content>
        <MainBody>
          <PostList>
            {currentPosts.map((post, index) => (
              <PostItem key={index}>
                <PostItemLeft>A1</PostItemLeft>
                <PostItemCenter>{post}</PostItemCenter>
                <PostItemRight>1999.04.15</PostItemRight>
              </PostItem>
            ))}
          </PostList>
          <Pagination>
            {Array.from({ length: Math.ceil(posts.length / PostsPerPage) }).map(
              (_, i) => (
                <PageButton key={i} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </PageButton>
              )
            )}
          </Pagination>
        </MainBody>
      </Content>
    </MainContainer>
  );
}

export default Board;
