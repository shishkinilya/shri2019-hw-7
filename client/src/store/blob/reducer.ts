import LoadingStatuses from 'constants/loadingStatuses';
import { BlobActionTypes, BlobState, GET_BLOB_CONTENT, GET_BLOB_CONTENT_SUCCESS, GET_BLOB_CONTENT_FAIL } from './types';

const initialState: BlobState = {
  content: '',
  status: LoadingStatuses.SUCCESS,
};

export default (state = initialState, action: BlobActionTypes): BlobState => {
  switch (action.type) {
    case GET_BLOB_CONTENT:
      return {
        ...state,
        status: LoadingStatuses.LOADING,
      };

    case GET_BLOB_CONTENT_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        status: LoadingStatuses.SUCCESS,
      };

    case GET_BLOB_CONTENT_FAIL:
      return {
        ...state,
        content: '',
        status: LoadingStatuses.FAIL,
      };

    default:
      return state;
  }
}
