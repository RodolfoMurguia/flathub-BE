import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  Patch,
} from '@nestjs/common';
import { GithubIntegrationService } from './github-integration.service';
import { ApiTags } from '@nestjs/swagger';
import { Get } from '@nestjs/common';
import { Response } from 'express';

@Controller('github-integration')
@ApiTags('Github Integration')
export class GithubIntegrationController {
  constructor(
    private readonly githubIntegrationService: GithubIntegrationService,
  ) {}

  @Get('/get-branches/:repoName')
  async ReciverBranches(@Param() params, @Res() res: Response) {
    let repository = params.repoName;

    if (!repository) {
      throw new NotFoundException('Repository invalid');
    }

    const repos = await this.githubIntegrationService.GetRepoBranches(
      repository,
    );

    if (!repos || repos.length === 0) {
      res.status(404).send('Repo not found, or empty');
    } else {
      res.status(200).json({ count: repos.length, data: repos });
    }
  }

  @Get('/get-branch/:repoName/:branchName')
  async RecoverBranch(@Param() params, @Res() res: Response) {
    let repository = params.repoName;
    let branchName = params.branchName;

    if (!repository || !branchName) {
      throw new NotFoundException('Repository or branch invalid');
    }

    const branch = await this.githubIntegrationService.GetRepoBranch(
      repository,
      branchName,
    );

    if (!branch) {
      throw new NotFoundException('Branch not found');
    } else {
      res.status(200).json({ data: branch });
    }
  }

  @Get('/get-commits/:repoName/:branchName')
  async RecoverCommits(@Param() params, @Res() res: Response) {
    let repository = params.repoName;
    let branchName = params.branchName;

    if (!repository || !branchName) {
      throw new NotFoundException('Repository or branch invalid');
    }

    const commits = await this.githubIntegrationService.GetRepoCommits(
      repository,
      branchName,
    );

    if (!commits) {
      throw new NotFoundException('Commits not found');
    } else {
      res.status(200).json({ data: commits });
    }
  }

  @Get('/get-commit/:repoName/:commitId')
  async RecoverCommit(@Param() params, @Res() res: Response) {
    let repository = params.repoName;
    let commitId = params.commitId;

    if (!repository || !commitId) {
      throw new NotFoundException('Repository or commitId invalid');
    }

    const commit = await this.githubIntegrationService.GetRepoCommit(
      repository,
      commitId,
    );

    if (!commit) {
      throw new NotFoundException('Commit not found');
    } else {
      res.status(200).json({ data: commit });
    }
  }

  @Get('/get-pullrequest/:repoName')
  async GetPullRequests(@Param() params, @Res() res: Response) {
    let repository = params.repoName;

    const pullRequestData = await this.githubIntegrationService.GetPullRequests(
      repository,
    );

    if (!pullRequestData) {
      throw new NotFoundException('Pull Request not found');
    } else {
      res.status(200).json({ data: pullRequestData });
    }
  }

  @Post('/post-pullrequest')
  async PostPullRequest(@Body() body: any, @Res() res: Response) {
    //get body data
    let repository = body.repository;
    let repoHead = body.repoHead;
    let repoBase = body.repoBase;
    let title = body.title;
    let bodyText = body.bodyText;

    if (!repository || !repoHead || !repoBase || !title || !bodyText) {
      throw new NotFoundException('Incomplete data');
    }

    const pullRequestData =
      await this.githubIntegrationService.CreatePullRequest(
        repository,
        repoHead,
        repoBase,
        title,
        bodyText,
      );

    if (!pullRequestData) {
      throw new NotFoundException('Pull Request not found');
    } else {
      res.status(200).json({ data: pullRequestData });
    }
  }

  @Put('/put-pullrequest/')
  async PutPullRequest(@Body() body: any, @Res() res: Response) {
  
    let repository = body.repository;
    let pullRequestId = body.pullRequestId;
    let commitMessage = body.commitMessage;

    if (!repository || !pullRequestId || !commitMessage) {
      throw new NotFoundException('Incomplete data');
    }

    const mergeData = await this.githubIntegrationService.MergePullRequest(
      repository,
      pullRequestId,
      commitMessage,
    );

    if (!mergeData) {
      throw new NotFoundException('Merge Process has failed');
    }

    res.status(200).json({ data: mergeData });

  }

  @Patch('/patch-pullrequest/:id')
  async PatchPullRequest(@Body() body: any,@Param() params, @Res() res: Response) {
  
    //extract data from body and url
    let repository = body.repository;
    let title = body.title;
    let bodyText = body.bodyText;
    let pullRequestId = params.id;

    //check if data is complete
    if (!repository || !title || !bodyText || !pullRequestId) {
      throw new NotFoundException('Incomplete data');
    }

    //call service
    const patchData = await this.githubIntegrationService.UpdatePullRequest(
      repository,
      pullRequestId,
      title,
      bodyText,
    );

    if (!patchData) {
      throw new NotFoundException('Patch Process has failed');
    }

    res.status(200).json({ data: patchData });

  }
}
