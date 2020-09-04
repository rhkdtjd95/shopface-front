import React from 'react';
import Button from '../common/Button';
import { Link, withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
const EmployTableBody = ({ match, employ }) => {
  return (
    <>
      <tr role="row">
        <td>
          <Link to={`${match.url}/${employ.no}`}> {employ.name}</Link>
        </td>
        <td>{employ.phone}</td>
        <td>{employ.email}</td>
        <td> {employ.salary}</td>
        <td>
          {employ.state === 'I'
            ? '초대'
            : employ.state === 'E'
            ? '합류'
            : '비활성화'}
        </td>
      </tr>
    </>
  );
};

const EmployListForm = ({
  employs,
  employError,
  show,
  onChange,
  onSearch,
  onKeyPress,
  closeModal,
  onSubmit,
  openModal,
  filterEmploys,
  match,
  employFilt,
  onInvite,
  onChecked,
  checked,
}) => {
  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">근무자 관리</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <div className="form-group" id="check-disable" />
                    <input
                      type="checkbox"
                      // checked={checked}
                      // onChecked={onChecked}
                    />
                    비활성화 근무자
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className="row">
                      <div className="form-inline col-3"></div>
                      <div className="form-inline col ml-6">
                        이름:
                        <input
                          type="text"
                          className="form-control form-control-sm mr-1 ml-1"
                          placeholder=""
                          aria-controls="datatables-buttons"
                          name="name"
                          onChange={onChange}
                          onKeyPress={onKeyPress}
                        />
                        <Button
                          className="btn btn-primary mr-1 ml-1"
                          onClick={onSearch}
                        >
                          검색
                        </Button>
                        <Button
                          className="btn btn-primary mr-1 ml-1"
                          data-toggle="modal"
                          data-target="#inviteModal"
                          onClick={openModal}
                        >
                          초대하기
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <table
                    className="table table-striped dataTable no-footer dtr-inline"
                    role="grid"
                    aria-describedby="datatables-buttons_info"
                  >
                    <thead>
                      <tr role="row">
                        <th>이름</th>
                        <th>휴대폰 번호</th>
                        <th>이메일</th>
                        <th>급여</th>
                        <th>상태</th>
                      </tr>
                    </thead>

                    <tbody id="table_body">
                      {employFilt !== null ? (
                        employFilt.map((empFilt, index) => (
                          <EmployTableBody
                            key={index}
                            employ={empFilt}
                            match={match}
                            onChecked={onChecked}
                            checked={checked}
                          ></EmployTableBody>
                        ))
                      ) : employs !== null && employs.length > 0 ? (
                        employs.map((employ, index) => (
                          <EmployTableBody
                            key={index}
                            employ={employ}
                            show={show}
                            closeModal={closeModal}
                            openModal={openModal}
                            match={match}
                            onChecked={onChecked}
                            checked={checked}
                          ></EmployTableBody>
                        ))
                      ) : (
                        <>
                          <tr role="row">
                            <td colSpan="4">등록된 회원이 없습니다.</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>

                  <div className="form-group">
                    <form onSubmit={onSubmit}>
                      <input type="hidden" />
                      <Modal show={show} onHide={closeModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>근무자 초대하기</Modal.Title>
                        </Modal.Header>
                        <hr />
                        <Modal.Body>
                          <input type="hidden" />
                          이름
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="이름을 입력해주세요"
                            id="name"
                            onChange={onChange}
                          />
                          <br />
                          이메일
                          <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="이메일을 입력해주세요"
                            name="email"
                            onChange={onChange}
                          />
                        </Modal.Body>
                        <hr />
                        <Modal.Footer>
                          <Button
                            type="button"
                            variant="secondary"
                            className="btn btn-outline-primary"
                            data-dismiss="modal"
                            onClick={closeModal}
                          >
                            Close
                          </Button>
                          <Button
                            variant="secondary"
                            className="btn btn-outline-primary"
                            onClick={onSubmit}
                          >
                            초대하기
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(EmployListForm);
