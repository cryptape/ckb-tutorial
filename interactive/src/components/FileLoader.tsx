import { FileSystemTree } from '@webcontainer/api';
import { createFileTree } from 'github-to-webcontainer';

export abstract class FileLoader {
  abstract getFileSystem(): Promise<FileSystemTree>;
}

export interface GitRepoFileLoaderOptions {
  subPath?: string;
  apiKey?: string;
}

export class GitRepoFileLoader extends FileLoader {
  private readonly repo: string;
  private readonly option?: GitRepoFileLoaderOptions;

  constructor(repo: string, option?: GitRepoFileLoaderOptions) {
    super();
    this.repo = repo;
    this.option = option;
  }

  private get storageKey() {
    if (this.option?.subPath) {
      return `${this.repo}/${this.option?.subPath}`;
    } else {
      return this.repo;
    }
  }

  async getFileSystem(): Promise<FileSystemTree> {
    const local = localStorage.getItem(this.storageKey);
    if (local) {
      void this.loadByGitRepo();
      return JSON.parse(local);
    } else {
      return this.loadByGitRepo();
    }
  }

  async loadByGitRepo(): Promise<FileSystemTree> {
    const tree = await createFileTree(this.repo, this.option);
    localStorage.setItem(this.storageKey, JSON.stringify(tree));
    return tree;
  }
}
