import { Test, TestingModule } from '@nestjs/testing';
import { ContasController } from 'src/application/controllers/conta.controller'; 

describe('ContaController', () => {
  let controller: ContasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContasController],
    }).compile();

    controller = module.get<ContasController>(ContasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
