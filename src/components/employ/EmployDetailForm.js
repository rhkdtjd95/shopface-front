import React from 'react';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

const EmployDetailForm = ({
  employ,
  onSubmit,
  onChange,
  error,
  onDisabled,
  onInvite,
}) => {
  if (employ === null) {
    return <div>loading...</div>;
  } else {
    return (
      <>
        <div>
          <div className="container-fluid p-0">
            <h1 className="h3 mb-3">근무자 상세 조회</h1>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">근무자 기본정보</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <div className="col-12 col-lg-6">
                        <div className="form-group">
                          <label>이름</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            onChange={onChange}
                            value={employ.name !== null ? employ.name : ''}
                          />
                        </div>
                        <div className="form-group">
                          <label>전화번호</label>
                          <input
                            type="text"
                            className="form-control"
                            name="phone"
                            disabled
                            value={employ.phone !== null ? employ.phone : ''}
                          />
                        </div>
                        <div className="form-group">
                          <label>이메일</label>
                          <input
                            type="text"
                            className="form-control"
                            name="email"
                            disabled
                            value={employ.email !== null ? employ.email : ''}
                          />
                        </div>
                        <div className="form-group">
                          <label>은행 명</label>
                          <input
                            type="text"
                            className="form-control"
                            name="bankName"
                            disabled
                            value={
                              employ.bankName !== null ? employ.bankName : ''
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>계좌번호</label>
                          <input
                            type="text"
                            className="form-control"
                            name="accountNum"
                            disabled
                            value={
                              employ.accountNum !== null
                                ? employ.accountNum
                                : ''
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label>급여</label>
                          <input
                            type="text"
                            className="form-control"
                            name="salary"
                            onChange={onChange}
                            value={employ.salary !== null ? employ.salary : 0}
                          />
                        </div>
                        <ErrorMessage>{error}</ErrorMessage>
                        <div className="mb-3">
                          <Button
                            type="button"
                            className="btn btn-primary"
                            onClick={onDisabled}
                            disabled={employ.state === 'D' && 'disabled'}
                          >
                            비활성화
                          </Button>
                          <Button className="btn btn-primary">수정</Button>
                          <Button
                            type="button"
                            to="/employ"
                            className="btn btn-primary"
                          >
                            취소
                          </Button>

                          {employ.state === 'D' ? (
                            <Button
                              type="button"
                              className="btn btn-primary mr-1 ml-1"
                              onClick={onInvite}
                            >
                              다시 초대하기
                            </Button>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default EmployDetailForm;
