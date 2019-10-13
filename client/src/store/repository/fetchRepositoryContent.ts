import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import apiClient from 'apiClient';
import { getRepositoryContent, getRepositoryContentSuccess, getRepositoryContentFail } from 'store/repository/actions';
import { AppState } from 'store/types';

const fetchRepositoryContent = (repositoryId: string, commitHash?: string, path?: string): ThunkAction<void, AppState, null, Action<string>> => {
  return (dispatch: Dispatch) => {
    dispatch(getRepositoryContent());

    apiClient.getRepoContent(repositoryId, commitHash, path)
      .then(body => dispatch(getRepositoryContentSuccess(body.data)))
      .catch(() => getRepositoryContentFail());
  }
};

export default fetchRepositoryContent;
