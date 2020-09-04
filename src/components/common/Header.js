import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import { MdAlarmOn } from 'react-icons/md';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;
const Wrapper = styled(Responsive)`
    height:4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size:1.125rem;
        font-weight: 800;
        letter-spacing:2px;
    }
    .right {
        display: flex
        align-items :center;
    }
`;
const Spacer = styled.div`
  height: 4rem;
`;
// const UserInfo = styled.div`
//   font-weight: 800;
//   margin-right: 1rem;
// `;

const Header = ({ user }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">ShopFace</div>
          <div className="right" />
          <button>
            <MdAlarmOn />
          </button>
          <button>로그인</button>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
