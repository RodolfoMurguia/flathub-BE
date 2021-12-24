import { Module } from '@nestjs/common';
import { GithubIntegrationModule } from './github-integration/github-integration.module';

@Module({
  imports: [GithubIntegrationModule],
})
export class AppModule {}
