const events = require('events');
const stream = require('stream');
const child = require('child_process');
const sinon = require('sinon');
const chai = require('chai');

const gitService = require('server/src/git.service');

describe('GitService', () => {
  let spawn;
  let spawnEvent;

  beforeEach(() => {
    spawn = sinon.stub(child, 'spawn');
    spawnEvent = new events.EventEmitter();
    spawnEvent.stdin = new stream.Writable();
    spawnEvent.stdout = new events.EventEmitter();
    spawnEvent.stderr = new events.EventEmitter();
    spawnEvent.kill = sinon.stub();
    spawn.returns(spawnEvent);
  });

  afterEach(() => {
    spawn.restore();
    spawnEvent = null;
  });

  it('Клонирование репозитория вызывается корректной командой', () => {
    // Arrange
    const dirPath = '/home/user/repos';
    const url = 'https://github.com/Vuejs/vue';

    setTimeout(() => spawnEvent.emit('close'), 0);

    // Act
    return gitService.addRepo(dirPath, { url })
      .then(() => {
        // Assert
        const [command, args, options] = (spawn.args[0]);
        chai.expect(command).to.equal('git');
        chai.expect(args).to.eql(['clone', 'https://github.com/Vuejs/vue', '-q']);
        chai.expect(options).to.eql({ cwd: dirPath });
      });
  });

  it('Получение списка коммитов вызывается корректной командой', () => {
    // Arrange
    const dirPath = '/home/user/repos';
    const repositoryId = 'some-repository';
    const commitHash = '7ah5gs6';

    setTimeout(() => spawnEvent.emit('close'), 0);

    // Act
    return gitService.getCommitList(dirPath, { repositoryId, commitHash })
      .then(() => {
        // Assert
        const [command, args, options] = (spawn.args[0]);
        chai.expect(command).to.equal('git');
        chai.expect(args).to.eql(['log', '--pretty=format:{"commit": "%H", "author": "%aN", "date": "%at", "message": "%f"},', commitHash]);
        chai.expect(options).to.eql({ cwd: `${dirPath}/${repositoryId}` });
      });
  });

  it('Получение списка дифа коммитов вызывается корректной командой', () => {
    // Arrange
    const dirPath = '/home/user/repos';
    const repositoryId = 'some-repository';
    const commitHash = '7ah5gs6';

    setTimeout(() => spawnEvent.emit('close'), 0);

    // Act
    return gitService.getCommitDiff(dirPath, { repositoryId, commitHash })
      .then(() => {
        // Assert
        const [command, args, options] = (spawn.args[0]);
        chai.expect(command).to.equal('git');
        chai.expect(args).to.eql(['show', commitHash, '-m', '--format="%b"']);
        chai.expect(options).to.eql({ cwd: `${dirPath}/${repositoryId}` });
      });
  });

  describe('Получение содержимого репозитория вызывается корректной командой:', () => {
    it('параметр path не передан, получаем содержимое корня репозитория', () => {
      // Arrange
      const dirPath = '/home/user/repos';
      const repositoryId = 'some-repository';
      const commitHash = '7ah5gs6';

      setTimeout(() => spawnEvent.emit('close'), 0);

      // Act
      return gitService.getRepoContent(dirPath, { repositoryId, commitHash })
        .then(() => {
          // Assert
          const [command, args, options] = (spawn.args[0]);
          chai.expect(command).to.equal('git');
          chai.expect(args).to.eql(['ls-tree', commitHash]);
          chai.expect(options).to.eql({ cwd: `${dirPath}/${repositoryId}` });
        });
    });

    it('параметр path передан, получаем содержимое репозитория по заданному пути', () => {
      // Arrange
      const dirPath = '/home/user/repos';
      const repositoryId = 'some-repository';
      const commitHash = '7ah5gs6';
      const path = 'src/components';

      setTimeout(() => spawnEvent.emit('close'), 0);

      // Act
      return gitService.getRepoContent(dirPath, { repositoryId, commitHash, path })
        .then(() => {
          // Assert
          const [command, args, options] = (spawn.args[0]);
          chai.expect(command).to.equal('git');
          chai.expect(args).to.eql(['ls-tree', commitHash, `${path}/`]);
          chai.expect(options).to.eql({ cwd: `${dirPath}/${repositoryId}` });
        });
    });

    it('параметр commitHash не передан, получаем содержимое репозитория в ветке master', () => {
      // Arrange
      const dirPath = '/home/user/repos';
      const repositoryId = 'some-repository';
      const path = 'src/components';

      setTimeout(() => spawnEvent.emit('close'), 0);

      // Act
      return gitService.getRepoContent(dirPath, { repositoryId, path })
        .then(() => {
          // Assert
          const [command, args, options] = (spawn.args[0]);
          chai.expect(command).to.equal('git');
          chai.expect(args).to.eql(['ls-tree', 'master', `${path}/`]);
          chai.expect(options).to.eql({ cwd: `${dirPath}/${repositoryId}` });
        });
    });
  });

  it('Получение содержимого файла вызывается корректной командой', () => {
    // Arrange
    const dirPath = '/home/user/repos';
    const repositoryId = 'some-repository';
    const commitHash = '7ah5gs6';
    const pathToFile = 'src/components/App.component.ts';
    const cbStub = sinon.stub();

    // Act
    gitService.getFileContent(dirPath, { repositoryId, commitHash, pathToFile }, cbStub, cbStub, cbStub);

    // Assert
    const [command, args, options] = (spawn.args[0]);
    chai.expect(command).to.equal('git');
    chai.expect(args).to.eql(['show', `${commitHash}:${pathToFile}`]);
    chai.expect(options).to.eql({ cwd: `${dirPath}/${repositoryId}` });
  });
});

