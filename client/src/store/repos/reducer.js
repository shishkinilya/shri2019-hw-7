import LOADING_STATUSES from 'constants/loadingStatuses';
import REPOS_ACTIONS from './actions';

const initialState = {
  list: [],
  status: LOADING_STATUSES.SUCCESS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPOS_ACTIONS.GET_REPOS:
      return {
        ...state,
        status: LOADING_STATUSES.LOADING,
      };

    case REPOS_ACTIONS.GET_REPOS_SUCCESS:
      return {
        ...state,
        list: action.payload.repos,
        status: LOADING_STATUSES.SUCCESS,
      };

    case REPOS_ACTIONS.GET_REPOS_FAIL:
      return {
        ...state,
        list: [],
        currentRepo: null,
        status: LOADING_STATUSES.FAIL,
      };

    default:
      return state;
  }
}
