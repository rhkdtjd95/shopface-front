import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;
const Footer = styled.div`
  margin-top: 1rem;
  text-align: left;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const ForgotPasswordForm = ({
  result,
  onChange,
  onSubmitCode,
  onChangePassword,
  error,
}) => {
  return (
    <AuthFormBlock>
      <h3>비밀번호 재발급</h3>
      <StyledInput
        type="text"
        name="name"
        placeholder="아이디"
        onChange={onChange}
      />
      {result !== null && result === 'OK' && (
        <>
          <StyledInput
            type="text"
            name="code"
            placeholder="확인 코드"
            onChange={onChange}
          />
          <StyledInput
            type="password"
            name="changePassword"
            placeholder="새 비밀번호"
            onChange={onChange}
          />
        </>
      )}
      <ErrorMessage>{error}</ErrorMessage>
      <Footer>
        <div>
          <Link to="/login">로그인</Link>
        </div>
        {result !== null && result === 'OK' ? (
          <div style={{ textAlign: 'center' }}>
            <Button onClick={onChangePassword}>비밀번호 변경</Button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Button onClick={onSubmitCode}> 재발급 코드 전송</Button>
          </div>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default ForgotPasswordForm;
