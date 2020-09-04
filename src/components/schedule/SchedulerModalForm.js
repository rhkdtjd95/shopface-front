import React from 'react';
import Button from '../common/Button';
import { TimePicker } from 'antd';
import Modal from 'react-bootstrap/Modal';
import 'antd/dist/antd.css';
import { Form } from '../../../node_modules/react-bootstrap/esm/index';
import moment from 'moment';
import ErrorMessage from '../common/ErrorMessage';

const SchedulerModalForm = ({
  schedule,
  show,
  closeModal,
  modalType,
  occupations,
  employs,
  onChange,
  onTimeChange,
  onScheduleSubmit,
  onScheduleDelete,
  error,
}) => {
  const { RangePicker } = TimePicker;
  let filterEmploys = null;
  if (employs !== null && employs !== []) {
    filterEmploys = employs.filter((employ) => employ.state === 'E');
  }

  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === 'post' ? '시간표 등록' : '시간표 수정'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group row col-sm-10">
              <label className="col-form-label col-sm-2 text-sm-right">
                이름
              </label>
              <div className="col-sm-9">
                {modalType === 'update' ? (
                  <Form.Control
                    as="select"
                    name="employNo"
                    className=" col-sm-9"
                    onChange={onChange}
                    value={schedule.resourceId}
                  >
                    {filterEmploys !== null &&
                      filterEmploys !== [] &&
                      filterEmploys.map((employ, index) => (
                        <option key={index} value={employ.no}>
                          {employ.name}
                        </option>
                      ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    as="select"
                    name="employNo"
                    className=" col-sm-9"
                    onChange={onChange}
                  >
                    <option value="x">근무자를 선택하세요</option>
                    {filterEmploys !== null &&
                      filterEmploys !== [] &&
                      filterEmploys.map((employ, index) => (
                        <option key={index} value={employ.no}>
                          {employ.name}
                        </option>
                      ))}
                  </Form.Control>
                )}
              </div>
            </div>
            <div className="form-group row col-sm-10">
              <label className="col-form-label col-sm-2 text-sm-right">
                시간
              </label>
              <div className="col-sm-9">
                {modalType === 'update' ? (
                  <RangePicker
                    format={'HH:mm'}
                    onChange={onTimeChange}
                    showTime={{
                      defaultValue: [
                        moment(
                          schedule.start.substring(
                            schedule.start.indexOf(' ') + 1,
                          ),
                          'HH:mm',
                        ),
                        moment(
                          schedule.end.substring(schedule.end.indexOf(' ') + 1),
                          'HH:mm',
                        ),
                      ],
                    }}
                  />
                ) : (
                  <RangePicker format={'HH:mm'} onChange={onTimeChange} />
                )}
              </div>
            </div>
            <div className="form-group row col-sm-10">
              <label className="col-form-label col-sm-2 text-sm-right">
                업무
              </label>
              <div className="col-sm-9">
                <div className="row m-1">
                  {modalType === 'update' ? (
                    <>
                      <Form.Control
                        as="select"
                        name="occupationNo"
                        className=" col-sm-7"
                        onChange={onChange}
                        value={schedule.occupationNo}
                      >
                        {occupations != null && occupations.length > 0 ? (
                          occupations.map((occupation, index) => (
                            <option key={index} value={occupation.no}>
                              {occupation.name}
                            </option>
                          ))
                        ) : (
                          <option value="x">업무를 등록해주세요</option>
                        )}
                      </Form.Control>
                      <Form.Control
                        as="input"
                        type="color"
                        name="color"
                        placeholder="업무"
                        className=" col-sm-4 ml-3"
                        onChange={onChange}
                        value={schedule.bgColor}
                        readOnly
                      />
                    </>
                  ) : (
                    <>
                      <Form.Control
                        as="select"
                        name="occupationNo"
                        className=" col-sm-7"
                        onChange={onChange}
                      >
                        <option value="x">업무를 선택하세요</option>
                        {occupations != null && occupations.length > 0 ? (
                          occupations.map((occupation, index) => (
                            <option key={index} value={occupation.no}>
                              {occupation.name}
                            </option>
                          ))
                        ) : (
                          <option value="x">업무를 등록해주세요</option>
                        )}
                      </Form.Control>
                      <input
                        type="color"
                        name="color"
                        placeholder="업무"
                        className=" col-sm-4 ml-3"
                        onChange={onChange}
                        readOnly
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <ErrorMessage>{error}</ErrorMessage>
        <Modal.Footer>
          {modalType === 'update' ? (
            <>
              <Button onClick={onScheduleSubmit}>수정</Button>
              <Button onClick={onScheduleDelete}>삭제</Button>
            </>
          ) : (
            <Button onClick={onScheduleSubmit}>시간표 등록</Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SchedulerModalForm;
