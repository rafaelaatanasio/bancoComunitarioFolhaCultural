import { Module } from '@nestjs/common';
import { GerentesService } from 'src/domain/services/gerente.service'; 
import { GerentesController } from 'src/application/controllers/gerente.controller'; 

@Module({
  providers: [GerentesService],
  controllers: [GerentesController],
  exports: [GerentesService],
})
export class GerenteModule {}
