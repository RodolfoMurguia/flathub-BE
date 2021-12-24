import { Injectable, Logger } from '@nestjs/common';
const { Octokit } = require('@octokit/rest');

@Injectable()
export class GithubIntegrationService {
  private readonly logger = new Logger(GithubIntegrationService.name);

  constructor() {}

  getHello(): string {
    return 'Hello Github!';
  }

  private getConnection() {
    this.logger.log('Connecting to Github');

    return new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
  }

  async GetRepoBranches(repoName: string) {
    const connection = this.getConnection();

    this.logger.log('Getting branches for repo: ' + repoName);

    const Data = await connection.request(
      'GET /repos/{owner}/{repo}/branches',
      {
        owner: 'FlatDigital',
        repo: repoName,
      },
    );
    
    return Data.data;
  }

  async GetRepoBranch(repoName, branchName) {
    const connection = this.getConnection();

    this.logger.log(
      'Getting branch: ' + branchName + ' from repo: ' + repoName,
    );

    const Data = await connection.request(
      'GET /repos/{owner}/{repo}/branches/{branch}',
      {
        owner: 'FlatDigital',
        repo: repoName,
        branch: branchName,
      },
    );

    let branchData = Data.data;

    let responseRepoName = Data.data.name;
    let repoCommit = Data.data.commit.commit;
    let author = Data.data.commit.author.login;

    let responseRepoCommit = {
      name: responseRepoName,
      commit: repoCommit,
      author: author,
    }

    return responseRepoCommit;
  }

  async GetRepoCommits(repoName, branchName) {
    const connection = this.getConnection();

    this.logger.log(
      'Getting commits for repo: ' + repoName + ' from branch: ' + branchName,
    );

    const Data = await connection.request('GET /repos/{owner}/{repo}/commits', {
      owner: 'FlatDigital',
      repo: repoName,
      branch: branchName,
    });

    let commitArray = [];

    Data.data.forEach((commit) => {
      var commitData = {
        shaId: commit.sha.substring(0, 7),
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        authorEmail: commit.commit.author.email,
        date: commit.commit.author.date,
      };

      commitArray.push(commitData);
    });

    return commitArray;
  }

  async GetRepoCommit(repoName, commitSha) {
    const connection = this.getConnection();

    this.logger.log(
      'Getting commit: ' +
        commitSha +
        ' from repo: ' +
        repoName 
    );

    const Data = await connection.request(
      'GET /repos/{owner}/{repo}/commits/{commit}',
      {
        owner: 'FlatDigital',
        repo: repoName,
        commit: commitSha,
      },
    );

    let commitData = Data.data;

    let commitDetail = {
      shaIndex: commitData.sha.substring(0, 7),
      sha: commitData.sha,
      message: commitData.commit.message,
      date: commitData.commit.author.date,
      author: commitData.commit.author.name,
      authorEmail: commitData.commit.author.email,
      filesModified: commitData.files.length,
    };

    return commitDetail;
  }

  async GetPullRequests(repoName) {
    const connection = this.getConnection();

    this.logger.log('Getting pull requests for repo: ' + repoName);

    const Data = await connection.request('GET /repos/{owner}/{repo}/pulls', {
      owner: 'FlatDigital',
      repo: repoName,
    });

    return Data.data;
  }

  async CompareBranches(repoName, base, head) {
    const connection = this.getConnection();

    this.logger.log(
      'Getting compare for repo: ' +
        repoName +
        ' from base: ' +
        base +
        ' to head: ' +
        head,
    );

    const Data = await connection.request(
      'GET /repos/{owner}/{repo}/compare/{base}...{head}',
      {
        owner: 'FlatDigital',
        repo: repoName,
        base: base,
        head: head,
      },
    );

    return Data;
  }

  async CreatePullRequest(repoName, repoHead, repoBase, title, body) {
    const connection = this.getConnection();

    this.logger.log(
      'Creating pull request for repo: ' +
        repoName +
        ' from base: ' +
        repoBase +
        ' to head: ' +
        repoHead,
    );

    const Data = await connection.request('POST /repos/{owner}/{repo}/pulls', {
      owner: 'FlatDigital',
      repo: repoName,
      title: title,
      body: body,
      head: repoHead,
      base: repoBase,
    });

    return Data;
  }

  //merge PR

  async MergePullRequest(repoName, pullRequestNumber, commitMessage) {
    const connection = this.getConnection();

    this.logger.log(
      'Merging pull request: ' + pullRequestNumber + ' from repo: ' + repoName,
    );

    const Data = await connection.request(
      'PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge',
      {
        owner: 'FlatDigital',
        repo: repoName,
        pull_number: pullRequestNumber,
        commit_message: commitMessage,
      },
    );
    return Data;
  }

  //update PR

  async UpdatePullRequest(repoName, pullRequestNumber, title, body) {
    const connection = this.getConnection();

    this.logger.log(
      'Updating pull request: ' + pullRequestNumber + ' from repo: ' + repoName,
    );

    const Data = await connection.request(
      'PATCH /repos/{owner}/{repo}/pulls/{pull_number}',
      {
        owner: 'FlatDigital',
        repo: repoName,
        pull_number: pullRequestNumber,
        title: title,
        body: body,
      },
    );
    return Data;
  }
}
