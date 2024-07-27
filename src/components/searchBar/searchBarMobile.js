import React from "react";
import styled from "styled-components";
import { ReactComponent as Glass } from "../../assets/glass.svg";

const SearchBarContainer = styled.div`
  width: calc(100% - 40px);
  margin: 10px 20px;
  border: 1px solid #686868;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 28px;
  padding: 0px;
  padding-left: 12px;
  font-size: 16px;
  margin: 0px;
  border: none;
  outline: none;
  transition: border-color 0.3s ease;
  textheight &:focus {
    border-color: #000;
  }
`;

const SearchBarMobile = ({ onChangeField }) => {
  return (
    <SearchBarContainer>
      <Glass width={20} height={20} />
      <SearchBarInput type="search" placeholder="원하는 키워드를 검색해보세요!" onChange={onChangeField} />
    </SearchBarContainer>
  );
};

export default SearchBarMobile;
