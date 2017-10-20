import styled from 'react-emotion';

export const Wrapper = styled.div`
  display: table;
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const Middle = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

export const Inner = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 450px;
  position: relative;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin: 0;
  font-weight: normal;
`;

export const SubTitle = styled.p`
  font-size: 12px;
`;

export const ButtonContainer = styled.div`
  text-align: right;
`;
