const GET_REPOS = '[REPOS] Get repository list';
const GET_REPOS_SUCCESS = '[REPOS] Get repository list success';
const GET_REPOS_FAIL = '[REPOS] Get repository list fail';

export function getRepos() {
  return { type: GET_REPOS };
}

export function getReposSuccess(repos) {
  return {
    type: GET_REPOS_SUCCESS,
    payload: {
      repos,
    },
  };
}

export function getReposFail() {
  return { type: GET_REPOS_FAIL }
}

export default {
  GET_REPOS,
  GET_REPOS_SUCCESS,
  GET_REPOS_FAIL,
}
