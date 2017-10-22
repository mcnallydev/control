import styled, { css } from 'react-emotion';

export const TabsTag = styled.div`
  height: 42px;
  line-height: 42px;
  background-color: #3b88c3;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.14);
  position: relative;
`;

export const Items = styled.ul`
  margin: 0;
  padding: 0 20px;
  width: 100%;
  list-style: none;
  line-height: 42px;
  height: 42px;
`;

export const Item = styled.li`
  float: left;
  line-height: 42px;
`;

export const LinkClassName = css`
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  padding: 9px 15px;
  font-size: 15px;
  font-weight: bold;
  border-bottom: 3px solid #3b88c3};
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }
`;

export const LinkClassNameActive = css`
  color: white;
  text-transform: uppercase;
  text-decoration: none;
  padding: 9px 15px;
  font-size: 15px;
  font-weight: bold;
  border-bottom: 3px solid white;
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }
`;
