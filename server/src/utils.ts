import { RepositoryEntry } from "./models/git";

export function parseLsTreeLog(log: string): Array<RepositoryEntry> {
  const result: Array<RepositoryEntry> = [];
  const entries = log.split('\n').filter(entry => !!entry);

  entries.forEach((entry) => {
    const name = entry.split('\t')[1];
    const type = entry.split(' ')[1];

    result.push({ name, type });
  });

  return result;
}
