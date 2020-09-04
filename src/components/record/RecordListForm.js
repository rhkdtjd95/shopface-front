import React from 'react';

const RecordTableBody = ({ record }) => {
  return (
    <>
      <tr role="row">
        <td>{record.occupationName}</td>
        <td>{record.branchName}</td>
        <td>{record.memberName}</td>
        <td>{record.workingStartTime}</td>
        <td>{record.workingTime}</td>
        <td>{record.quittingTime}</td>
        <td>{record.salayPlan}</td>
        <td>{record.salayPay}</td>
        <td>{record.evaluation}</td>
        <td>{record.note}</td>
      </tr>
    </>
  );
};

const RecordListForm = ({ employRecords, businessRecords }) => {
  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">근무 기록</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="row">
                  <div className="col-sm-12 col-md-8"></div>
                  <div className="col-sm-12 col-md-4">
                    <div className="row">
                      <div className="form-inline col">
                        <div className="form-inline col-12"></div>
                        <select
                          id="condition"
                          name="condition"
                          className="form-control"
                        >
                          <option value="branch">사업장 명</option>
                          <option value="businessman">사업자 명</option>
                        </select>
                        <input
                          type="text"
                          id="searchQuery"
                          name="searchQuery"
                          className="form-control form-control-sm mr-1 ml-1"
                          placeholder=""
                          aria-controls="datatables-buttons"
                        />
                        <input
                          type="button"
                          className="btn btn-primary mr-1 ml-1"
                          id="searchButton"
                          name="searchButton"
                          value="검색"
                        />
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
                        <tr>
                          <th>업무</th>
                          <th>사업장</th>
                          <th>근무자 명</th>
                          <th>근무 시간</th>
                          <th>출근 시간</th>
                          <th>퇴근 시간</th>
                          <th>급여(예상)</th>
                          <th>급여(지급)</th>
                          <th>평점</th>
                          <th>비고</th>
                        </tr>
                      </thead>
                      <tbody id="table_body">
                        {businessRecords !== null ? (
                          businessRecords.map((businessrecord, index) => (
                            <RecordTableBody
                              key={index}
                              record={businessrecord}
                            ></RecordTableBody>
                          ))
                        ) : employRecords !== null ? (
                          employRecords.map((emprecord, index) => (
                            <RecordTableBody
                              key={index}
                              record={emprecord}
                            ></RecordTableBody>
                          ))
                        ) : (
                          <>
                            <tr role="row">
                              <td colSpan="4">등록된 기록이 없습니다.</td>
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
export default RecordListForm;
