import LOADING_STATUSES from 'constants/loadingStatuses';
import REPOSITORY_ACTIONS from './actions';

const initialState = {
  content: [],
  status: LOADING_STATUSES.SUCCESS,
  currentBranch: 'master',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REPOSITORY_ACTIONS.GET_REPOSITORY_CONTENT:
      return {
        ...state,
        status: LOADING_STATUSES.LOADING,
      };

    case REPOSITORY_ACTIONS.GET_REPOSITORY_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        status: LOADING_STATUSES.SUCCESS,
      };

    case REPOSITORY_ACTIONS.GET_REPOSITORY_CONTENT_FAIL:
      return {
        ...state,
        content: [],
        status: LOADING_STATUSES.FAIL,
      };

    default:
      return state;
  }
}

