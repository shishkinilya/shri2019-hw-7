import { GET_REPOS, GET_REPOS_FAIL, GET_REPOS_SUCCESS, ReposActionTypes, SET_CURRENT_REPOSITORY } from './types';

export function getRepos(): ReposActionTypes {
  return { type: GET_REPOS };
}

export function getReposSuccess(repos: Array<string>): ReposActionTypes {
  return {
    type: GET_REPOS_SUCCESS,
    payload: {
      repos,
    },
  };
}

export function getReposFail(): ReposActionTypes {
  return { type: GET_REPOS_FAIL };
}

export function setCurrentRepository(repositoryId: string): ReposActionTypes {
  return {
    type: SET_CURRENT_REPOSITORY,
    payload: {
      repositoryId,
    },
  };
}
