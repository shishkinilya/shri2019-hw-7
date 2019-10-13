import fs from 'fs';
import fse from 'fs-extra';
import child from 'child_process';
import { join } from 'path';
import { promisify } from 'util';

import { parseLsTreeLog } from './utils';
import {
  AddRepo,
  DeleteRepo,
  GetCommitDiff,
  GetCommitList,
  GetFileContent,
  GetRepoContent,
  RepositoryEntry
} from './models/git';

const promisifiedReadDir = promisify(fs.readdir);

const getRepoList = (dirPath: string): Promise<Array<string>> => promisifiedReadDir(dirPath, 'utf8');

const addRepo = (dirPath: string, { url }: AddRepo): Promise<void> => {
  const CHILD_PROCESS_TIMEOUT = 60 * 10 ** 3;
  return new Promise((resolve, reject) => {
    const childProcess = child.spawn('git', ['clone', url, '-q'], { cwd: dirPath });

    setTimeout(() => {
      childProcess.kill();
      reject('Timeout exceeded');
    }, CHILD_PROCESS_TIMEOUT);

    childProcess.stderr.on('data', error => reject(error.toString()));
    childProcess.on('close', () => resolve());
  });
};

const getCommitList = (dirPath: string, { repositoryId, commitHash }: GetCommitList): Promise<string> => {
  return new Promise((resolve, reject) => {
    const childProcess = child.spawn(
      'git',
      ['log', '--pretty=format:{"commit": "%H", "author": "%aN", "date": "%at", "message": "%f"},', commitHash],
      {
        cwd: join(dirPath, repositoryId),
      },
    );
    let result = '';

    childProcess.stdout.on('data', data => result += data);
    childProcess.stderr.on('data', error => reject(error.toString()));
    // slice removes last comma
    childProcess.on('close', () => resolve(`[${result.slice(0, -1)}]`));
  });
};

const getCommitDiff = (dirPath: string, { repositoryId, commitHash }: GetCommitDiff): Promise<string> => {
  return new Promise(((resolve, reject) => {
    const childProcess = child.spawn(
      'git',
      ['show', commitHash, '-m', '--format="%b"'],
      {
        cwd: join(dirPath, repositoryId),
      },
    );
    let result = '';

    childProcess.stdout.on('data', data => result += data);
    childProcess.stderr.on('data', error => reject(error.toString()));
    childProcess.on('close', () => resolve(result));
  }));
};

const getRepoContent = (dirPath: string, { repositoryId, commitHash, path }: GetRepoContent): Promise<Array<RepositoryEntry>> => {
  return new Promise((resolve, reject) => {
    const gitArgs = ['ls-tree', commitHash || 'master'];

    if (path) {
      gitArgs.push(`${path}/`);
    }

    const childProcess = child.spawn(
      'git',
      gitArgs,
      {
        cwd: join(dirPath, repositoryId),
      },
    );
    let result: Array<RepositoryEntry> = [];

    childProcess.stdout.on('data', data => result.push(...parseLsTreeLog(data.toString())));
    childProcess.stderr.on('data', error => reject(error.toString()));
    childProcess.on('close', () => resolve(result));
  })
};

const getFileContent = (
  dirPath: string,
  { repositoryId, commitHash, pathToFile }: GetFileContent,
  onDataCb: (data: string) => void,
  onErrCb: (data: Buffer) => void,
  onCloseCb: () => void,
): void => {
  const childProcess = child.spawn(
    'git',
    ['show', `${commitHash}:${pathToFile}`],
    {
      cwd: join(dirPath, repositoryId),
    }
  );

  childProcess.stdout.on('data', onDataCb);
  childProcess.stderr.on('data', onErrCb);
  childProcess.on('close', onCloseCb);
};

const deleteRepo = (dirPath: string, { repositoryId }: DeleteRepo): Promise<void> => fse.remove(join(dirPath, repositoryId));

export default {
  getRepoList,
  addRepo,
  getCommitList,
  getCommitDiff,
  getRepoContent,
  getFileContent,
  deleteRepo,
};
