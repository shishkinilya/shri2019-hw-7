import express, { Request, Response } from 'express';
import { argv } from 'yargs';
import path from 'path';
import mime from 'mime-types';
import cors from 'cors';

import gitService from './git.service';

const app = express();
const dirPath = argv.path as string;
console.log(argv);

app.use(express.json());
app.use(cors());

app.get('/api/repos', async (req: Request, res: Response) => {
  try {
    const repoList = await gitService.getRepoList(dirPath);
    res.json({ data: repoList });
  } catch (error) {
    res.status(500);
    res.json({ error });
  }
});

app.post('/api/repos', async (req: Request, res: Response) => {
  try {
    await gitService.addRepo(dirPath, req.body);
    res.json({ data: { status: 'ok' } });
  } catch (error) {
    res.status(500);
    res.json({
      error: {
        message: error,
      },
    });
  }
});

app.get('/api/repos/:repositoryId/commits/:commitHash', async (req: Request, res: Response) => {
  try {
    const commitList = await gitService.getCommitList(
      dirPath,
      { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash },
    );
    res.json({ data: JSON.parse(commitList) });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId/commits/:commitHash/diff', async (req: Request, res: Response) => {
  try {
    const commitDiff = await gitService.getCommitDiff(
      dirPath,
      { repositoryId: req.params.repositoryId, commitHash: req.params.repositoryId },
    );
    res.json({ data: commitDiff });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId', async (req: Request, res: Response) => {
  try {
    const repoContent = await gitService.getRepoContent(
      dirPath,
      { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash, path: req.params.path },
    );
    res.json({ data: repoContent });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId/tree/:commitHash?/:path([^/]*)?', async (req: Request, res: Response) => {
  try {
    const repoContent = await gitService.getRepoContent(
      dirPath,
      { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash, path: req.params.path },
    );
    res.json({ data: repoContent });
  } catch (error) {
    res.json({ error });
  }
});

app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)?', (req: Request, res: Response) => {
  const { repositoryId, pathToFile } = req.params;
  const filePath = path.join(dirPath, repositoryId, pathToFile);
  const contentType = mime.contentType(path.extname(filePath));
  const dataCb = (data: string) => res.write(data);
  const errCb = (error: Buffer) => {
    res.status(500);
    res.json({ error: error.toString() });
  };
  const closeCb = () => res.send();

  res.type(contentType || 'application/octet-stream');
  gitService.getFileContent(
    dirPath,
    { repositoryId: req.params.repositoryId, commitHash: req.params.commitHash, pathToFile: req.params.path },
    dataCb,
    errCb,
    closeCb,
  );
});

app.delete('/api/repos/:repositoryId', async (req: Request, res: Response) => {
  try {
    await gitService.deleteRepo(
      dirPath,
      { repositoryId: req.params.repositoryId }
    );
    res.json({ data: { status: 'ok' } });
  } catch (error) {
    res.json({ error });
  }
});

app.listen(3000);
