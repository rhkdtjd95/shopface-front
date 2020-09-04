import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DaumPostcode from 'react-daum-postcode';
import Button from '../common/Button';

const BranchDetailForm = ({
  branch,
  originBranch,
  onChange,
  onSubmit,
  onDelete,
  show,
  error,
  handleComplete,
  openModal,
  closeModal,
}) => {
  if (originBranch === null) {
    return <div></div>;
  } else {
    return (
      <>
        <div className="container-fluid p-0">
          <h1 className="h3 mb-3">사업장 조회</h1>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body">
                  <form onSubmit={onSubmit}>
                    <div className="form-group col-md-4">
                      <label>사업장 명 :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={onChange}
                        value={originBranch.name}
                      />
                      <div className="text-center-mt-3" id="checkNameDiv"></div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>전화번호 :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={onChange}
                        value={originBranch.phone}
                      />
                      <br />
                      <div
                        className="text-center-mt-3"
                        id="checkPhoneDiv"
                      ></div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>우편 번호 :</label>
                      <Button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={openModal}
                      >
                        우편번호 찾기
                      </Button>
                      <Modal show={show} onHide={closeModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>우편 번호 찾기</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <DaumPostcode onComplete={handleComplete} />
                        </Modal.Body>
                      </Modal>
                      <input
                        type="text"
                        className="form-control"
                        name="zipCode"
                        readOnly
                        value={originBranch.zipCode}
                      />
                      <br />
                      <div className="text-center-mt-3"></div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>주소 :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        readOnly
                        value={originBranch.address}
                      />
                      <br />
                    </div>
                    <div className="form-group col-md-2">
                      <label>상세 주소 :</label>
                      <input
                        type="text"
                        className="form-control"
                        name="detailAddress"
                        value={originBranch.detailAddress}
                        onChange={onChange}
                      />
                      <br />
                    </div>
                    <div className="form-group col-md-4">
                      <label>사업장 등록증</label>
                      <br />
                      <input
                        type="file"
                        accept="image/jpg, impge/png, image/jpeg, image/gif"
                        name="licenseImage"
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-group" style={{ color: 'red' }}>
                      {error}
                    </div>
                    <Button className="btn btn-outline-primary">수정</Button>
                    <Button
                      type="button"
                      onClick={onDelete}
                      className="btn btn-outline-primary"
                    >
                      삭제
                    </Button>
                    <Button
                      type="button"
                      to="/branch"
                      className="btn btn-outline-primary"
                    >
                      목록
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default BranchDetailForm;
