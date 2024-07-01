import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { activeCategoryState } from "../../atoms/activeCategoryState";
import styled from "styled-components";

const NavContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  background-color: #f5f5f5;
`;

const NavItem = styled.div`
  flex: none;
  padding: 10px 15px;
  margin: 0 5px;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? "black" : "rgba(173, 173, 173, 1)")};
  background-color: ${(props) => (props.active ? "#e0e0e0" : "white")};
  border-radius: 20px;
  &:hover {
    background: #c0c0c0;
  }
`;

const SideBar = () => {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);

  const categories = [
    "전체",
    "정치",
    "경제",
    "사회",
    "생활/문화",
    "IT/과학",
    "세계",
  ];

  useEffect(() => {
    setActiveCategory("전체");
  }, []);

  return (
    <>
      <NavContainer>
        {categories.map((category) => (
          <NavItem
            key={category}
            active={category === activeCategory}
            onClick={() => setActiveCategory(category)}>
            {category}
          </NavItem>
        ))}
      </NavContainer>
    </>
  );
};

export default SideBar;
