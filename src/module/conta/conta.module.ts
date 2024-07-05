import { Module } from '@nestjs/common';
import { ContasService } from './conta.service';
import { ContasController } from './conta.controller';
import { ClientesModule } from '../cliente/cliente.module';

@Module({
  imports: [ClientesModule],
  providers: [ContasService],
  controllers: [ContasController]
})
export class ContasModule { }
