import React from 'react';
import Clock from 'react-live-clock';
import Button from '../common/Button';
import { withRouter } from 'react-router-dom';
import { BiRefresh } from 'react-icons/bi';
const RTableBody = ({ dashboard }) => {
  return (
    <>
      <tr role="row">
        <td>{dashboard.employName}</td>
        <td>{dashboard.occupationName}</td>
        <td>
          {dashboard.workStartTime}~{dashboard.workEndTime}
        </td>
        <td>{Math.ceil(dashboard.hoursPlan)}</td>
        <td>{Math.ceil(dashboard.salaryPlan)}</td>
        <td>
          {dashboard.scheduleStatus === 'R'
            ? '근무중'
            : dashboard.scheduleStatus === 'W'
            ? '근무 완료'
            : dashboard.scheduleStatus === 'C'
            ? '근무 예정'
            : ''}
        </td>
        <td>{Math.ceil(dashboard.actualWorkingHours)}</td>
        <td>{Math.ceil(dashboard.actualSalary)}</td>
      </tr>
    </>
  );
};

const WTableBody = ({ dashboard }) => {
  return (
    <>
      <tr role="row">
        <td>{dashboard.employName}</td>
        <td>{dashboard.occupationName}</td>
        <td>
          {dashboard.workStartTime}~{dashboard.workEndTime}
        </td>
        <td>{Math.ceil(dashboard.hoursPlan)}</td>
        <td>{Math.ceil(dashboard.salaryPlan)}</td>
      </tr>
    </>
  );
};

const CTableBody = ({ dashboard }) => {
  return (
    <>
      <tr role="row">
        <td>{dashboard.employName}</td>
        <td>{dashboard.occupationName}</td>
        <td>
          {dashboard.workStartTime}~{dashboard.workEndTime}
        </td>
        <td>{Math.ceil(dashboard.hoursPlan)}</td>
        <td>{Math.ceil(dashboard.salaryPlan)}</td>
        <td>
          {dashboard.scheduleStatus === 'R'
            ? '근무중'
            : dashboard.scheduleStatus === 'W'
            ? '근무 완료'
            : dashboard.scheduleStatus === 'C'
            ? '근무 예정'
            : ''}
        </td>
        <td>{Math.ceil(dashboard.actualWorkingHours)}</td>
        <td>{Math.ceil(dashboard.actualSalary)}</td>
      </tr>
    </>
  );
};

const BusinessDashboard = ({
  time,
  businessW,
  businessR,
  businessC,
  onRefresh,
}) => {
  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">근무 현황</h1>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {time !== null && time}
              <Button onClick={onRefresh}>
                새로 고침
                <BiRefresh />
              </Button>
              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="row">
                  <div className="col-sm-12">
                    <form>
                      근무중
                      <table
                        className="table table-striped dataTable no-footer dtr-inline"
                        role="grid"
                        aria-describedby="datatables-buttons_info"
                      >
                        <thead>
                          <tr role="row">
                            <th>근무자</th>
                            <th>담당 업무</th>
                            <th>스케줄</th>
                            <th>예상 시간</th>
                            <th>예상급여</th>
                            <th>상태</th>
                            <th>실제시간</th>
                            <th>실제 급여</th>
                          </tr>
                        </thead>
                        <tbody>
                          {businessR !== null ? (
                            businessR.map((dashboard, index) => (
                              <RTableBody
                                key={index}
                                dashboard={dashboard}
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
                      <br></br>
                      근무예정
                      <table
                        className="table table-striped dataTable no-footer dtr-inline"
                        role="grid"
                        aria-describedby="datatables-buttons_info"
                      >
                        <thead>
                          <tr role="row">
                            <th>근무자</th>
                            <th>담당 업무</th>
                            <th>스케줄</th>
                            <th>예상 시간</th>
                            <th>예상급여</th>
                            <th>상태</th>
                            <th>실제시간</th>
                            <th>실제 급여</th>
                          </tr>
                        </thead>
                        <tbody>
                          {businessW !== null ? (
                            businessW.map((dashboard, index) => (
                              <WTableBody
                                key={index}
                                dashboard={dashboard}
                              ></WTableBody>
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
                      <br></br>
                      근무완료
                      <table
                        className="table table-striped dataTable no-footer dtr-inline"
                        role="grid"
                        aria-describedby="datatables-buttons_info"
                      >
                        <thead>
                          <tr role="row">
                            <th>근무자</th>
                            <th>담당 업무</th>
                            <th>스케줄</th>
                            <th>예상 시간</th>
                            <th>예상급여</th>
                            <th>상태</th>
                            <th>실제시간</th>
                            <th>실제 급여</th>
                          </tr>
                        </thead>
                        <tbody>
                          {businessC !== null ? (
                            businessC.map((dashboard, index) => (
                              <CTableBody
                                key={index}
                                dashboard={dashboard}
                              ></CTableBody>
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
export default withRouter(BusinessDashboard);
