import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';

import apiClient from 'apiClient';
import { getBlobContent, getBlobContentSuccess, getBlobContentFail } from 'store/blob/actions';
import { AppState } from 'store/types';

const fetchBlobContent = (repositoryId: string, commitHash: string, path: string): ThunkAction<void, AppState, null, Action<string>> => {
  return (dispatch: Dispatch) => {
    dispatch(getBlobContent());

    apiClient.getBlobContent(repositoryId, commitHash, path)
      .then(content => {
        dispatch(getBlobContentSuccess(content));
      })
      .catch(() => getBlobContentFail());
  }
};

export default fetchBlobContent;
