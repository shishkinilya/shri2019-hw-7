import { Dispatch } from 'redux';

import apiClient from 'apiClient';
import { getRepos, getReposFail, getReposSuccess } from 'store/repos/actions';

const fetchRepos = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getRepos());

    try {
      const responseData = await apiClient.getRepos();
      dispatch(getReposSuccess(responseData.data));
    } catch (e) {
      dispatch(getReposFail());
    }
  };
};

export default fetchRepos;
