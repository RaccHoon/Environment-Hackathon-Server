import { Test, TestingModule } from '@nestjs/testing';
import { AuthPostingService } from './auth-posting.service';

describe('AuthPostingService', () => {
  let service: AuthPostingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthPostingService],
    }).compile();

    service = module.get<AuthPostingService>(AuthPostingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
