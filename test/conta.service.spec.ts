import { Test, TestingModule } from '@nestjs/testing';
import { ContasService } from 'src/domain/services/conta.service'; 

describe('ContaService', () => {
  let service: ContasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContasService],
    }).compile();

    service = module.get<ContasService>(ContasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
