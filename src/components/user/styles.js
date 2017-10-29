import styled, { css } from 'react-emotion';

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 500px;
`;

export const ButtonsContainer = styled.div`
  position: relative;
  overflow: hidden;
  text-align: right;
  padding-top: 20px;
  padding-bottom: 10px;
`;

export const LinkClassName = css`
  cursor: pointer;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  float: right;
  padding: 10px 15px;
  color: #4285f4;
  &:hover {
    background-color: #eeeeee;
    border-radius: 2px;
  }
`;

export const ButtonContainer = styled.div`
  float: right;
  margin-left: 10px;
`;

export const Error = styled.div`
  color: #d50000;
  flex: 1 1 auto;
  font-size: 14px;
  padding: 6px;
  border-radius: 3px;
  margin-top: 20px;
  text-align: center;
`;
