import { createAction, handleActions } from 'redux-actions';

const CHANGE_SELECT = 'scheduleSelect/CHANGE_SELECT';

export const changeSelect = createAction(CHANGE_SELECT);

const initalState = {
  selectedSchedule: '',
};

const scheduleSelect = handleActions(
  {
    [CHANGE_SELECT]: (state, { payload: value }) => ({
      ...state,
      selectedSchedule: value,
    }),
  },
  initalState,
);

export default scheduleSelect;
