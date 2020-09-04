import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  background: #64bdc4;
  &:hover {
    background: #76d4db;
  }
`;

const Button = ({ to, history, ...rest }) => {
  const onClick = (e) => {
    if (to) {
      history.push(to);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };
  return <StyledButton {...rest} onClick={onClick} />;
};

export default withRouter(Button);
