import React from "react";
import styled from "styled-components";
import { ReactComponent as Glass } from "../../assets/glass.svg";

const SearchBarContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin: 0 auto;
  border-bottom: 1px solid black;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  border: none;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
  }
`;

const SearchBar = ({ onChangeField }) => {
  return (
    <SearchBarContainer>
      <Glass />
      <SearchBarInput type="text" placeholder="원하는 키워드를 검색해보세요!" onChange={onChangeField} />
    </SearchBarContainer>
  );
};

export default SearchBar;
