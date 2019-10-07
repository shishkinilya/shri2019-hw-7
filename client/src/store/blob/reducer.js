import LOADING_STATUSES from 'constants/loadingStatuses';
import FILE_ACTIONS from './actions';

const initialState = {
  content: '',
  status: LOADING_STATUSES.SUCCESS,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILE_ACTIONS.GET_BLOB_CONTENT:
      return {
        ...state,
        status: LOADING_STATUSES.LOADING,
      };

    case FILE_ACTIONS.GET_BLOB_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        status: LOADING_STATUSES.SUCCESS,
      };

    case FILE_ACTIONS.GET_BLOB_CONTENT_FAIL:
      return {
        ...state,
        content: '',
        status: LOADING_STATUSES.FAIL,
      };

    default:
      return state;
  }
}
