import styled, { css } from 'react-emotion';

export const Master = styled.div`
  height: 100%;
`;

export const Sidebar = styled.div`
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
  top: 0px;
  left: 0px;
  z-index: 100;
  max-height: 100%;
  height: 100%;
  width: 272px;
  background-color: #FFFFFF;
  float: left;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 4px 5px 0 rgba(0, 0 ,0 , 0.14), 0 1px 0;
`;

export const Items = styled.ul`
  width: 272px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: table;
  table-layout: fixed;
`;

export const Item = styled.li`
  width: 272px;
  margin: 0;
  padding: 0;
  display: table-row;
  position: relative;
`;

export const LinkClassName = css`
  height: 64px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
  white-space: nowrap;
  cursor: pointer;
  display: block;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  align-items: center;
  float: left;
  width: 100%;
  &:hover {
    text-decoration: none;
    background-color: #eeeeee;
  }
`;

export const LinkActiveClassName = css`
  color: #3b88c3;
`;

export const Text = styled.span`
  height: 64px !important;
  line-height: 64px !important;
`;

export const Icon = styled.i`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  font-size: 25px !important;
  margin-right: 18px;
  padding-left: 25px;
`;

export const Page = styled.div`
  margin-left: 272px;
  position: relative;
  overflow: visible;
`;
