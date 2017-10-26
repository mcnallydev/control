import styled from 'react-emotion';

export const FormInput = styled.div`
  position: relative;
  height: 39px;
`;

export const FormInputDropdown = styled.div`
  float: left;
  align-items: flex-start;
  justify-content: flex-start;
  width: ${props => props.width};
  height: 39px;
  position: relative;
  margin-right: 15px;
`;

export const FormInputDropdownLabel = styled.div`
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 -1px 1px -1px rgba(0,0,0,.12);
  border-radius: 2px;
  background-color: #FFFFFF;
  color: #212121;
  display: ${props => props.display ? 'none' : 'block'};
  width: ${props => props.width};
  padding: 10px 0 10px 15px;
`;
