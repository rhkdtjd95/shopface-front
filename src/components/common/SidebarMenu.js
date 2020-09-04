import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

const SidebarMenu = ({ user }) => {
  return (
    <div>
      <ProSidebar width="15rem">
        <Menu
          iconShape="square"
          style={{
            backgroundColor: '#354052',
            position: 'fixed',
            width: '15rem',
            color: '#64bdc4',
            height: '100vh',
          }}
        >
          {user !== null && ['B', 'E'].includes(user.type) ? (
            <MenuItem>
              홈<Link to="/" />
            </MenuItem>
          ) : (
            <div></div>
          )}
          {user !== null && user.type === 'A' ? (
            <SubMenu title="회원 관리">
              <MenuItem>
                <Link to="/member">회원 목록 </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/branch">사업장 목록 </Link>
              </MenuItem>
            </SubMenu>
          ) : (
            <div></div>
          )}
          {user !== null && ['B', 'E'].includes(user.type) ? (
            <SubMenu title="스케줄 관리">
              <MenuItem>
                <Link to="/schedule">전체 스케줄 관리 </Link>
              </MenuItem>
              <MenuItem>
                <Link to="#">나의 스케줄 관리 </Link>
              </MenuItem>
            </SubMenu>
          ) : (
            <div></div>
          )}
          {user !== null && ['B', 'E'].includes(user.type) ? (
            <SubMenu title="근태 관리">
              <MenuItem>
                <Link to="/record">근무 기록 </Link>
              </MenuItem>
              <MenuItem>
                <Link to="#">이벤트 관리 </Link>
              </MenuItem>
            </SubMenu>
          ) : (
            <div></div>
          )}
          {user !== null && user.type === 'B' ? (
            <SubMenu title="사업장 관리">
              <MenuItem>
                <Link to="/branch">사업장 관리 </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/employ">근무자 관리 </Link>
              </MenuItem>
            </SubMenu>
          ) : (
            <div></div>
          )}

          {user !== null && ['B', 'E'].includes(user.type) ? (
            <MenuItem>
              급여관리
              <Link to="#" />
            </MenuItem>
          ) : (
            <div></div>
          )}

          {user !== null && ['B', 'E'].includes(user.type) ? (
            user.type === 'B' ? (
              <SubMenu title="설정">
                <MenuItem>
                  <Link to={user != null ? `/member/${user.name}` : '/login'}>
                    나의 정보 관리
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/occupation">업무 관리 </Link>
                </MenuItem>
              </SubMenu>
            ) : (
              <SubMenu title="설정">
                <MenuItem>
                  <Link to={user != null ? `/member/${user.name}` : '/login'}>
                    나의 정보 관리
                  </Link>
                </MenuItem>
              </SubMenu>
            )
          ) : (
            <div></div>
          )}
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default SidebarMenu;
