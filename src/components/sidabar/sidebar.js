import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { activeCategoryState } from "../../atoms/activeCategoryState";
import styled from "styled-components";
import { ReactComponent as ChevronBottom } from "../../assets/chevron-bottom.svg";
import { ReactComponent as ChevronTop } from "../../assets/chevron-top.svg";
import categoryImg from "../../assets/category.png";

const NavItem = styled.div`
  padding: 15px 10px;
  margin: 5px 0;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? "black" : "rgba(173, 173, 173, 1)")};
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

  &:hover {
    background: #c0c0c0;
  }
`;

const SideBar = () => {
  const [activeCategory, setActiveCategory] =
    useRecoilState(activeCategoryState);
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    "전체",
    "정치",
    "경제",
    "사회",
    "생활/문화",
    "IT/과학",
    "세계",
  ];

  return (
    <>
      <CategoryButton onClick={() => setShowCategories(!showCategories)}>
        <img src={categoryImg} alt="category" />
        카테고리 {showCategories ? <ChevronTop /> : <ChevronBottom />}
      </CategoryButton>
      {showCategories &&
        categories.map((category) => (
          <NavItem
            key={category}
            active={category === activeCategory}
            onClick={() => setActiveCategory(category)}>
            {category}
          </NavItem>
        ))}
    </>
  );
};

export default SideBar;
