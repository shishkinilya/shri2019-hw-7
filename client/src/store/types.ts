import { BlobState } from './blob/types';
import { ReposState } from './repos/types';
import { RepositoryState } from './repository/types';

export interface AppState {
  blob: BlobState;
  repos: ReposState;
  repository: RepositoryState;
}
