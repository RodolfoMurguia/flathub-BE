import { Module } from '@nestjs/common';
import { GithubIntegrationService } from './github-integration.service';
import { GithubIntegrationController } from './github-integration.controller';

@Module({
  providers: [GithubIntegrationService],
  controllers: [GithubIntegrationController]
})
export class GithubIntegrationModule {}
