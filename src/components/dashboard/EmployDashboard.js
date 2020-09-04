import React from 'react';
import Button from '../common/Button';
import { withRouter } from 'react-router-dom';
const RTableBody = ({ Rtable, onWork, onQuit }) => {
  return (
    <>
      <tr role="row">
        <td>
          {Rtable.workStartTime}~{Rtable.workEndTime}_{Rtable.branchName}(
          {Rtable.occupationName})
        </td>
        <td>
          {Rtable != null ? (
            Rtable.state === 'R' ? (
              <Button
                type="button"
                className="btn btn-primary"
                onClick={onWork}
                value={Rtable.scheduleNo}
              >
                출근
              </Button>
            ) : (
              Rtable.state === 'W' && (
                <Button
                  className="btn btn-primary"
                  onClick={onQuit}
                  value={Rtable.scheduleNo}
                >
                  퇴근
                </Button>
              )
            )
          ) : (
            <div></div>
          )}
          {/* <Button
            type="button"
            className="btn btn-primary"
            onClick={onWork}
            value={Rtable.scheduleNo}
          >
            출근
          </Button>
          <Button
            className="btn btn-primary"
            onClick={onQuit}
            value={Rtable.scheduleNo}
          >
            퇴근
          </Button> */}
        </td>
      </tr>
    </>
  );
};
const WTableBody = ({ Wtable, onWork, onQuit }) => {
  return (
    <>
      <tr role="row">
        <td>{Wtable.branchName}</td>
        <td>{Wtable.occupationName}</td>
        <td>
          {Wtable.workStartTime}~{Wtable.workEndTime}
        </td>
        <td>{Math.ceil(Wtable.hoursPlan)}</td>
        <td>{Math.ceil(Wtable.salaryPlan)}</td>
        <td>
          {Wtable.state === 'R'
            ? '근무중'
            : Wtable.state === 'W'
            ? '근무 예정'
            : Wtable.state === 'C'
            ? '근무 완료'
            : ''}
        </td>
        <td>{Math.ceil(Wtable.actualWorkingHours)}</td>
        <td>{Math.ceil(Wtable.actualSalary)}</td>
        <td>
          <Button>요청하기</Button>
        </td>
      </tr>
    </>
  );
};

const CTableBody = ({ Ctable, onWork, onQuit }) => {
  return (
    <>
      <tr role="row">
        <td>{Ctable.branchName}</td>
        <td>{Ctable.occupationName}</td>
        <td>
          {Ctable.workStartTime}~{Ctable.workEndTime}
        </td>
        <td>{Math.ceil(Ctable.hoursPlan)}</td>
        <td>{Math.ceil(Ctable.salaryPlan)}</td>
        <td>
          {Ctable.state === 'R'
            ? '근무중'
            : Ctable.state === 'W'
            ? '근무 예정'
            : Ctable.state === 'C'
            ? '근무 완료'
            : ''}
        </td>
        <td>{Math.ceil(Ctable.actualWorkingHours)}</td>
        <td>{Math.ceil(Ctable.actualSalary)}</td>
        <td>
          <Button>요청하기</Button>
        </td>
      </tr>
    </>
  );
};

const EmployDashboard = ({ employR, employW, employC, onWork, onQuit }) => {
  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="dataTables_wrapper dt-bootstrap4 no-footer"></div>
              <div className="row">
                <div className="col-sm-12">
                  <h5>현재 스케줄</h5>
                  <table
                    className="table table-striped dataTable no-footer dtr-inline"
                    role="grid"
                    aria-describedby="datatables-buttons_info"
                  >
                    <tbody>
                      {employR !== null && employR.length > 0 ? (
                        employR.map((Rtable, index) => (
                          <RTableBody
                            key={index}
                            Rtable={Rtable}
                            onWork={onWork}
                            onQuit={onQuit}
                          ></RTableBody>
                        ))
                      ) : (
                        <>
                          <tr role="row">
                            <td colSpan="4">데이터가 없습니다.</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>

                  <h5>예정스케줄</h5>
                  <table
                    className="table table-striped dataTable no-footer dtr-inline"
                    role="grid"
                    aria-describedby="datatables-buttons_info"
                  >
                    <thead>
                      <tr role="row">
                        <th>근무지</th>
                        <th>담당 업무</th>
                        <th>스케줄</th>
                        <th>예상 시간</th>
                        <th>예상급여</th>
                        <th>상태</th>
                        <th>실제시간</th>
                        <th>실제 급여</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {employW !== null && employW.length > 0 ? (
                        employW.map((Wtable, index) => (
                          <WTableBody key={index} Wtable={Wtable}></WTableBody>
                        ))
                      ) : (
                        <>
                          <tr role="row">
                            <td colSpan="4">데이터가 없습니다.</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  <h5>지난스케줄</h5>
                  <table
                    className="table table-striped dataTable no-footer dtr-inline"
                    role="grid"
                    aria-describedby="datatables-buttons_info"
                  >
                    <thead>
                      <tr role="row">
                        <th>근무지</th>
                        <th>담당 업무</th>
                        <th>스케줄</th>
                        <th>예상 시간</th>
                        <th>예상급여</th>
                        <th>상태</th>
                        <th>실제시간</th>
                        <th>실제 급여</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {employC !== null && employC.length > 0 ? (
                        employC.map((Ctable, index) => (
                          <CTableBody key={index} Ctable={Ctable}></CTableBody>
                        ))
                      ) : (
                        <>
                          <tr role="row">
                            <td colSpan="4">데이터가 없습니다.</td>
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
  );
};
export default withRouter(EmployDashboard);
