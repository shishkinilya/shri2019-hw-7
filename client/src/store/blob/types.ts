import LoadingStatuses from 'constants/loadingStatuses';

export const GET_BLOB_CONTENT = '[BLOB] Get blob content';
export const GET_BLOB_CONTENT_SUCCESS = '[BLOB] Get blob content success';
export const GET_BLOB_CONTENT_FAIL = '[BLOB] Get blob content fail';

interface BlobContent {
  content: string;
}

interface GetBlobContentAction {
  type: typeof GET_BLOB_CONTENT;
}

interface GetBlobContentSuccessAction {
  type: typeof GET_BLOB_CONTENT_SUCCESS;
  payload: BlobContent;
}

interface GetBlobContentFailAction {
  type: typeof GET_BLOB_CONTENT_FAIL;
}

export interface BlobState {
  content: string;
  status: LoadingStatuses;
}

export type BlobActionTypes = GetBlobContentAction | GetBlobContentSuccessAction | GetBlobContentFailAction;
