import { Test, TestingModule } from '@nestjs/testing';
import { AuthPostingController } from './auth-posting.controller';

describe('AuthPostingController', () => {
  let controller: AuthPostingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthPostingController],
    }).compile();

    controller = module.get<AuthPostingController>(AuthPostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
