import React from 'react';
import Button from '../common/Button';
import { withRouter } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage';

const OccupationTableBody = ({
  occupation,
  onDelete,
  onEdit,
  updateChange,
  index,
}) => {
  return (
    <>
      <tr role="row">
        <td>
          <input
            type="text"
            name="name"
            className="form-control col-sm-5"
            value={occupation.name}
            index={index}
            onChange={updateChange}
          />
        </td>
        <td>
          <Button
            className="btn btn-primary"
            onClick={onEdit}
            value={occupation.no}
          >
            수정
          </Button>
          <Button
            className="btn btn-primary"
            onClick={onDelete}
            value={occupation.no}
          >
            삭제
          </Button>
        </td>
      </tr>
    </>
  );
};

const OccupationListForm = ({
  occupations,
  occupationPost,
  onSubmit,
  onChange,
  onDelete,
  onEdit,
  error,
  updateChange,
}) => {
  return (
    <>
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">업무 관리</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="col-sm-6">
                  <form onSubmit={onSubmit}>
                    <div className="row">
                      <div>
                        <div className="row"></div>
                        <div>
                          업무명:
                          <input
                            type="text"
                            className="form-control ml-2 mr-2"
                            name="name"
                            onChange={onChange}
                            value={occupationPost.name}
                          />
                          <br />
                        </div>
                      </div>
                      <div className="ml-4 mr-2">
                        <ErrorMessage>{error}</ErrorMessage>
                        <Button className="mt-1" name="postBtn">
                          등록
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  id="datatables-buttons_wrapper"
                  className="dataTables_wrapper dt-bootstrap4 no-footer"
                >
                  <div className="row">
                    <div className="col-sm-12">
                      <table
                        id="datatables-buttons"
                        className="table table-striped dataTable no-footer dtr-inline"
                        role="grid"
                        aria-describedby="datatables-buttons_info"
                      >
                        <thead id="table_head">
                          <tr role="row">
                            <th>업무</th>
                            <th>관리</th>
                          </tr>
                        </thead>
                        <tbody id="table-body">
                          {occupations !== null && occupations.length > 0 ? (
                            occupations.map((occupation, index) => (
                              <OccupationTableBody
                                key={index}
                                index={index}
                                occupation={occupation}
                                onDelete={onDelete}
                                onChange={onChange}
                                onEdit={onEdit}
                                updateChange={updateChange}
                              ></OccupationTableBody>
                            ))
                          ) : (
                            <>
                              <tr role="row">
                                <td colSpan="4">등록된 업무가 없습니다.</td>
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
export default withRouter(OccupationListForm);
