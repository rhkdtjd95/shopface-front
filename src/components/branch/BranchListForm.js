import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link, withRouter } from 'react-router-dom';
import Button from '../common/Button';

const BranchTableBody = ({
  branch,
  user,
  match,
  modal,
  onModalBtn,
  closeModal,
  onConfirm,
  onReject,
}) => {
  return (
    <>
      <tr role="row">
        <td>
          <Link to={`${match.url}/${branch.no}`}> {branch.name}</Link>
        </td>
        <td>{branch.phone}</td>
        <td>{branch.state === 'N' ? '미승인' : '승인'}</td>
        <td>
          <Button
            className="btn btn-outline-primary"
            value={branch.no}
            onClick={onModalBtn}
          >
            보기
          </Button>
        </td>
        {user !== null && user.type === 'A' && (
          <td>
            {branch.state === 'Y' ? (
              <Button onClick={onReject} value={branch.no}>
                사업장 거부
              </Button>
            ) : (
              <Button onClick={onConfirm} value={branch.no}>
                사업장 승인
              </Button>
            )}
          </td>
        )}
      </tr>
      <Modal
        show={modal.targetModal === JSON.stringify(branch.no) && modal.show}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>사업자 등록증 이미지</Modal.Title>
        </Modal.Header>
        {branch.businessLicensePath !== null && (
          <Modal.Body>
            <img
              src={branch.businessLicensePath}
              alt="사업자 등록증 이미지"
              style={{ width: '100%', height: '100%' }}
            />
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const BranchListForm = ({
  branchs,
  user,
  branchError,
  loading,
  match,
  modal,
  closeModal,
  onModalBtn,
  onConfirm,
  onReject,
}) => {
  return (
    <>
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">사업장 목록</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                  <div className="row">
                    <div className="col-sm-12">
                      <Button
                        style={{ float: 'right' }}
                        className="btn btn-outline-primary"
                        to="/branch/post"
                      >
                        등록
                      </Button>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                    style={{ display: 'none' }}
                  >
                    <div className="modal-dialog modal-lg" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            사업자 등록증 이미지 보기
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <table
                        className="table table-striped dataTable no-footer dtr-inline"
                        style={{ width: '100%' }}
                        role="grid"
                        aria-describedby="datatables-buttons_info"
                      >
                        <thead id="table_head">
                          <tr>
                            <th>사업장 명</th>
                            <th>전화변호</th>
                            <th>승인 현황</th>
                            <th>사업장 등록증</th>
                            {user !== null && user.type === 'A' && <th></th>}
                          </tr>
                        </thead>
                        <tbody id="table_body">
                          {branchs !== null && branchs.length > 0 ? (
                            branchs.map((branch, index) => (
                              <BranchTableBody
                                key={index}
                                branch={branch}
                                user={user}
                                match={match}
                                modal={modal}
                                closeModal={closeModal}
                                onModalBtn={onModalBtn}
                                onConfirm={onConfirm}
                                onReject={onReject}
                              />
                            ))
                          ) : (
                            <>
                              <tr role="row">
                                <td colSpan="4">등록된 지점이 없습니다.</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(BranchListForm);
