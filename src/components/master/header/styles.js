import styled from 'react-emotion';

export const HeaderTag = styled.div`
  height: 64px;
  line-height: 64px;
  background-color: #3b88c3;
  z-index: 2;
  position: relative;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  color: white;
  float: left;
  width: auto;
`;

export const IconContainer = styled.span`
  cursor: pointer;
`;

export const Icon = styled.i`
  float: left;
  padding: 20px;
  color: white;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
