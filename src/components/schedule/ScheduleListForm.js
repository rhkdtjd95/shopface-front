import React from 'react';
import Scheduler from 'react-big-scheduler';

const ScheduleListForm = ({
  schedulerData,
  prevClick,
  nextClick,
  onSelectDate,
  onViewChange,
  eventItemClick,
  onScrollLeft,
  onScrollRight,
  onScrollTop,
  onScrollBottom,
  toggleExpandFunc,
  newEvent,
  nonAgendaCellHeaderTemplateResolver,
}) => {
  return (
    <>
      <div className="container-fluid p-0">
        <h1 className="h3 mb-3">스케줄</h1>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <Scheduler
                  schedulerData={schedulerData}
                  prevClick={prevClick}
                  nextClick={nextClick}
                  onSelectDate={onSelectDate}
                  onViewChange={onViewChange}
                  eventItemClick={eventItemClick}
                  onScrollLeft={onScrollLeft}
                  onScrollRight={onScrollRight}
                  onScrollTop={onScrollTop}
                  onScrollBottom={onScrollBottom}
                  toggleExpandFunc={toggleExpandFunc}
                  newEvent={newEvent}
                  nonAgendaCellHeaderTemplateResolver={
                    nonAgendaCellHeaderTemplateResolver
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleListForm;
