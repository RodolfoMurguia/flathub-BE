import { Test, TestingModule } from '@nestjs/testing';
import { GithubIntegrationController } from './github-integration.controller';

describe('GithubIntegrationController', () => {
  let controller: GithubIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubIntegrationController],
    }).compile();

    controller = module.get<GithubIntegrationController>(GithubIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
