/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Button from './Button';
import BranchSelectBox from '../branch/BranchSelectForm';
import Modal from '../../../node_modules/react-bootstrap/esm/Modal';
import ErrorMessage from './ErrorMessage';
import AlarmContainer from '../../containers/common/AlarmContainer';
import { Form } from '../../../node_modules/react-bootstrap/esm/index';

const SideBarHeaderForm = ({
  user,
  branchs,
  show,
  openModal,
  closeModal,
  onLogout,
  onChange,
  onPatchEmployByCertCode,
  error,
}) => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white">
        <a className="sidebar-toggle d-flex mr-2">
          <i className="hamburger align-self-center"></i>
        </a>
        <div className="navbar-collapse collapse">
          {user !== null && user.type === 'B' && (
            <div className="ml-auto" style={{ width: '200px' }}>
              <BranchSelectBox branchs={branchs} />
            </div>
          )}

          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <AlarmContainer />
            </li>
            <li>
              <div className="row">
                <div>
                  {user !== null ? (
                    <div>
                      <Button onClick={onLogout}>로그아웃</Button>
                    </div>
                  ) : (
                    <div>
                      <Button to="/login">로그인</Button>
                    </div>
                  )}
                </div>
                <div>
                  {user !== null ? (
                    user.type !== undefined && user.type === 'E' ? (
                      <div style={{ marginRight: '1rem' }}>
                        <Button onClick={openModal}>지점 추가</Button>
                      </div>
                    ) : (
                      <div></div>
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>인증 코드</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group>
                    <label>인증 코드</label>
                    <Form.Control
                      type="text"
                      placeholder="ex) Qedxd"
                      onChange={onChange}
                    />
                  </Form.Group>
                </Modal.Body>
                <ErrorMessage>{error}</ErrorMessage>
                <Modal.Footer>
                  <Button onClick={onPatchEmployByCertCode}>인증</Button>
                </Modal.Footer>
              </Modal>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default SideBarHeaderForm;
