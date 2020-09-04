import React from 'react';
import Button from '../common/Button';
import { Link, withRouter } from 'react-router-dom';

const MemberTableBody = ({ member, match }) => {
  return (
    <>
      <tr role="row">
        <td>
          <Link to={`${match.url}/${member.id}`}>{member.name}</Link>
        </td>
        <td>{member.phone}</td>
        <td>{member.email}</td>
        <td>{member.type === 'B' ? '사업자' : '회원'}</td>
        <td>{member.state === 'A' ? '활성화' : '비활성화'}</td>
      </tr>
    </>
  );
};

const MemberListForm = ({
  members,
  memberError,
  loading,
  onChange,
  onSearch,
  onKeyPress,
  filterMembers,
  searchRef,
  match,
}) => {
  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">회원 목록</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="row">
                  <div className="col-sm-12 col-md-8">비활성화 근무자</div>
                  <div className="col-sm-12 col-md-4">
                    <div className="row">
                      <div className="form-inline col">
                        <div className="form-inline col-12"></div>
                        이름 :
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-sm mr-1 ml-1"
                          aria-controls="datatables-buttons"
                          onChange={onChange}
                          onKeyPress={onKeyPress}
                        />
                        <Button
                          className="btn btn-primary mr-1 ml-1"
                          onClick={onSearch}
                        >
                          검색
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      id="datatables-buttons"
                      className="table table-striped dataTable no-footer dtr-inline"
                      // style="width: 100%;"
                      role="grid"
                      aria-describedby="datatables-buttons_info"
                    >
                      <thead>
                        <tr role="row">
                          <th>이름</th>
                          <th>휴대폰 번호</th>
                          <th>이메일</th>
                          <th>구분</th>
                          <th>상태</th>
                        </tr>
                      </thead>
                      <tbody id="table_body">
                        {filterMembers !== null ? (
                          filterMembers.map((filterMember, index) => (
                            <MemberTableBody
                              key={index}
                              member={filterMember}
                            ></MemberTableBody>
                          ))
                        ) : members !== null && members.length > 0 ? (
                          members.map((member, index) => (
                            <MemberTableBody
                              key={index}
                              member={member}
                              match={match}
                            ></MemberTableBody>
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

export default withRouter(MemberListForm);
