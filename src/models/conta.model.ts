import { Module } from '@nestjs/common';
import { ContasService } from '../services/conta.service';
import { ContasController } from './conta.controller';
import { ClientesModule } from './cliente.model';

@Module({
  imports: [ClientesModule],
  providers: [ContasService],
  controllers: [ContasController]
})
export class ContasModule { }
