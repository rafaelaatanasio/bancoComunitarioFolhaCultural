import { Test, TestingModule } from '@nestjs/testing';
import { GerentesController } from '../src/application/controllers/gerente.controller';

describe('GerenteController', () => {
  let controller: GerentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GerentesController],
    }).compile();

    controller = module.get<GerentesController>(GerentesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
