import { Module } from '@nestjs/common';
import { ContasService } from 'src/domain/services/conta.service';
import { ContasController } from 'src/application/controllers/conta.controller'; 

@Module({
  providers: [ContasService],
  controllers: [ContasController],
  exports: [ContasService],
})
export class ContaModule {}
