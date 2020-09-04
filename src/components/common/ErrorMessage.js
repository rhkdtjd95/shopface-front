import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.div`
  color: red;
  text-align: left;
  font-size: 0.875rem;
  margin: 0.5rem;
`;

const ErrorMessage = ({ ...rest }) => {
  return <StyledErrorMessage {...rest} />;
};

export default ErrorMessage;
