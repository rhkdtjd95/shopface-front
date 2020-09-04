import { createAction, handleActions } from 'redux-actions';

const CHANGE_SELECT = 'branchSelect/CHANGE_SELECT';

export const changeSelect = createAction(CHANGE_SELECT);

const initalState = {
  selectedBranch: '',
};

const branchSelect = handleActions(
  {
    [CHANGE_SELECT]: (state, { payload: value }) => ({
      ...state,
      selectedBranch: value,
    }),
  },
  initalState,
);

export default branchSelect;
