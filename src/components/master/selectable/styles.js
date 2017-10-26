import styled from 'react-emotion';

export const Container = styled.div`
  width: ${props => props.width};
  padding: 15px 0;
  float: left;
  text-align: center;
  cursor: pointer;
  color: ${props => props.active ? '#4285f4' : '#333333'};
  background-color: ${props => props.active ? 'rgba(158, 158, 158, .2)' : '#FFFFFF'};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &:hover {
    background-color: rgba(158, 158, 158, .2);
  }
`;
