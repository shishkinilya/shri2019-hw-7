import LoadingStatuses from 'constants/loadingStatuses';

export const GET_REPOS = '[REPOS] Get repository list';
export const GET_REPOS_SUCCESS = '[REPOS] Get repository list success';
export const GET_REPOS_FAIL = '[REPOS] Get repository list fail';
export const SET_CURRENT_REPOSITORY = '[REPOS] Set current repository';

interface GetRepositorySuccessPayload {
  repos: Array<string>;
}

interface SetCurrentRepositoryPayload {
  repositoryId: string;
}

interface GetReposAction {
  type: typeof GET_REPOS;
}

interface GetReposSuccessAction {
  type: typeof GET_REPOS_SUCCESS;
  payload: GetRepositorySuccessPayload;
}

interface GetReposFailAction {
  type: typeof GET_REPOS_FAIL;
}

interface SetCurrentRepositoryAction {
  type: typeof SET_CURRENT_REPOSITORY;
  payload: SetCurrentRepositoryPayload;
}

export interface ReposState {
  list: Array<string>,
  status: LoadingStatuses;
  currentRepository: string;
}

export type ReposActionTypes = GetReposAction | GetReposSuccessAction | GetReposFailAction | SetCurrentRepositoryAction;
