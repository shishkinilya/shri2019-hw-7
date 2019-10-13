import LoadingStatuses from 'constants/loadingStatuses';

export const GET_REPOSITORY_CONTENT = '[REPOSITORY] Get repository content';
export const GET_REPOSITORY_CONTENT_SUCCESS = '[REPOSITORY] Get repository content success';
export const GET_REPOSITORY_CONTENT_FAIL = '[REPOSITORY] Get repository content fail';
export const SET_CURRENT_PATH = '[REPOSITORY] Set current path';

interface SetCurrentPathPayload {
  path: string;
}

interface SetRepositoryContentSuccessPayload {
  content: Array<RepositoryItem>;
}

interface GetRepositoryContentAction {
  type: typeof GET_REPOSITORY_CONTENT;
}

interface GetRepositoryContentSuccessAction {
  type: typeof GET_REPOSITORY_CONTENT_SUCCESS;
  payload: SetRepositoryContentSuccessPayload;
}

interface GetRepositoryContentFailAction {
  type: typeof GET_REPOSITORY_CONTENT_FAIL;
}

interface SetCurrentPath {
  type: typeof SET_CURRENT_PATH;
  payload: SetCurrentPathPayload;
}

export interface RepositoryItem {
  name: string;
  type: string;
}

export interface RepositoryState {
  content: Array<RepositoryItem>;
  status: LoadingStatuses;
  currentBranch: string;
  currentPath: string;
}

export type RepositoryActionTypes = GetRepositoryContentAction | GetRepositoryContentSuccessAction | GetRepositoryContentFailAction | SetCurrentPath;
