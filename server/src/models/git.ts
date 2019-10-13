export interface AddRepo {
  url: string;
}

export interface GetCommitList {
  repositoryId: string;
  commitHash: string;
}

export interface GetCommitDiff {
  repositoryId: string;
  commitHash: string;
}

export interface GetRepoContent {
  repositoryId: string;
  commitHash: string;
  path: string;
}

export interface GetFileContent {
  repositoryId: string;
  commitHash: string;
  pathToFile: string;
}

export interface DeleteRepo {
  repositoryId: string;
}

export interface RepositoryEntry {
  name: string;
  type: string;
}
