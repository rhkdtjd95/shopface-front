import React from 'react';
import Button from '../common/Button';
import DaumPostcode from 'react-daum-postcode';
import Modal from '../../../node_modules/react-bootstrap/esm/Modal';
import ErrorMessage from '../common/ErrorMessage';

const branchPostForm = ({
  onSubmit,
  onChange,
  error,
  handleComplete,
  show,
  closeModal,
  openModal,
  zipCode,
  address,
}) => {
  return (
    <>
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">사업장 등록</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header"></div>
              <div className="card-body">
                <form onSubmit={onSubmit}>
                  <div className="form-group col-md-4">
                    사업장 이름 :
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      onChange={onChange}
                    />
                    <br />
                  </div>
                  <div className="form-group col-md-4">
                    전화번호 :
                    <input
                      type="text"
                      id="phone"
                      className="form-control"
                      name="phone"
                      onChange={onChange}
                    />
                    <br />
                  </div>
                  <div className="form-group col-md-4">
                    우편 번호 :
                    <Button
                      type="button"
                      style={{ margin: '10px' }}
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
                      id="zipCode"
                      className="form-control"
                      name="zipCode"
                      onChange={onChange}
                      readOnly
                      value={zipCode}
                    />
                    <br />
                  </div>
                  <div className="form-group col-md-4">
                    주소 :
                    <input
                      type="text"
                      id="address"
                      className="form-control"
                      name="address"
                      onChange={onChange}
                      readOnly
                      value={address}
                    />
                    <br />
                  </div>
                  <div className="form-group col-md-2">
                    상세 주소 :
                    <input
                      type="text"
                      id="detailAddress"
                      className="form-control"
                      name="detailAddress"
                      onChange={onChange}
                    />
                    <br />
                  </div>
                  <ErrorMessage>{error}</ErrorMessage>
                  <Button className="btn btn-outline-primary">등록</Button>
                  <Button className="btn btn-outline-primary" to="/branch">
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
};

export default branchPostForm;
