import LOADING_STATUSES from 'constants/loadingStatuses';
import {
  GET_REPOS,
  GET_REPOS_FAIL,
  GET_REPOS_SUCCESS,
  ReposActionTypes,
  ReposState,
  SET_CURRENT_REPOSITORY,
} from './types';

const initialState: ReposState = {
  list: [],
  status: LOADING_STATUSES.SUCCESS,
  currentRepository: '',
};

export default (state = initialState, action: ReposActionTypes): ReposState => {
  switch (action.type) {
    case GET_REPOS:
      return {
        ...state,
        status: LOADING_STATUSES.LOADING,
      };

    case GET_REPOS_SUCCESS:
      return {
        ...state,
        list: action.payload.repos,
        status: LOADING_STATUSES.SUCCESS,
      };

    case GET_REPOS_FAIL:
      return {
        ...state,
        list: [],
        status: LOADING_STATUSES.FAIL,
      };

    case SET_CURRENT_REPOSITORY:
      return {
        ...state,
        currentRepository: state.list.find(repository => repository === action.payload.repositoryId) || ''
      };

    default:
      return state;
  }
}
