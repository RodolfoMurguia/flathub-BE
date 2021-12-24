import { Test, TestingModule } from '@nestjs/testing';
import { GithubIntegrationService } from './github-integration.service';

describe('GithubIntegrationService', () => {
  let service: GithubIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubIntegrationService],
    }).compile();

    service = module.get<GithubIntegrationService>(GithubIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
