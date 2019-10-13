import LOADING_STATUSES from 'constants/loadingStatuses';
import {
  GET_REPOSITORY_CONTENT,
  GET_REPOSITORY_CONTENT_FAIL,
  GET_REPOSITORY_CONTENT_SUCCESS,
  SET_CURRENT_PATH,
  RepositoryActionTypes,
  RepositoryState,
} from './types';

const initialState: RepositoryState = {
  content: [],
  status: LOADING_STATUSES.SUCCESS,
  currentBranch: 'master',
  currentPath: '',
};

export default (state = initialState, action: RepositoryActionTypes): RepositoryState => {
  switch (action.type) {
    case GET_REPOSITORY_CONTENT:
      return {
        ...state,
        status: LOADING_STATUSES.LOADING,
      };

    case GET_REPOSITORY_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        status: LOADING_STATUSES.SUCCESS,
      };

    case GET_REPOSITORY_CONTENT_FAIL:
      return {
        ...state,
        content: [],
        status: LOADING_STATUSES.FAIL,
      };

    case SET_CURRENT_PATH:
      return {
        ...state,
        currentPath: action.payload.path,
      };

    default:
      return state;
  }
}

