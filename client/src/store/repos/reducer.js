import LOADING_STATUSES from 'constants/loadingStatuses';
import REPOS_ACTIONS from './actions';

const initialState = {
  list: [],
  status: LOADING_STATUSES.SUCCESS,
  currentRepository: '',
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
        status: LOADING_STATUSES.FAIL,
      };

    case REPOS_ACTIONS.SET_CURRENT_REPOSITORY:
      return {
        ...state,
        currentRepository: state.list.find(repository => repository === action.payload.repositoryId) || ''
      };

    default:
      return state;
  }
}
