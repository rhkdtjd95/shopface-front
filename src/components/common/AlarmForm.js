import React from 'react';
import { Dropdown } from '../../../node_modules/react-bootstrap/esm/index';

const AlarmForm = ({ formAlarm, onDelete, onAllList }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="/#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));
  return (
    <Dropdown>
      <div className="position-relative">
        <Dropdown.Toggle as={CustomToggle}>
          <svg
            xmlns="http:www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bell align-middle mr-5"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </Dropdown.Toggle>
      </div>
      <div style={{ position: 'relative', right: 350 }}>
        <Dropdown.Menu className="dropdown-menu dropdown-menu-lg dropdown-menu-right py-0">
          <Dropdown.Header style={{ textAlign: 'center' }}>
            읽지 않은 알람 목록
          </Dropdown.Header>
          <Dropdown.Divider />
          {formAlarm !== null &&
            formAlarm.map((alarm) => (
              <div key={alarm.no}>
                <Dropdown.Item
                  eventKey={alarm.no}
                  onClick={onDelete}
                  no={alarm.no}
                >
                  <h5>{alarm.title}</h5>
                  {alarm.contents[0]}
                  <br />
                  {alarm.contents[1]}
                  <br />
                  {alarm.registerDate}
                </Dropdown.Item>
                <Dropdown.Divider />
              </div>
            ))}
          <Dropdown.Item style={{ textAlign: 'center' }}>
            전체 알람 보기
          </Dropdown.Item>
        </Dropdown.Menu>
      </div>
    </Dropdown>
  );
};

export default AlarmForm;
