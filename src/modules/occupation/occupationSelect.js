import { createAction, handleActions } from 'redux-actions';

const CHANGE_SELECT = 'occupationSelect/CHANGE_SELECT';

export const changeSelect = createAction(CHANGE_SELECT);

const initalState = {
  selectedOccupation: '',
};

const occupationSelect = handleActions(
  {
    [CHANGE_SELECT]: (state, { payload: value }) => ({
      ...state,
      selectedOccupation: value,
    }),
  },
  initalState,
);

export default occupationSelect;
