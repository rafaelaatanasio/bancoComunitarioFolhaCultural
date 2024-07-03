import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ContaService } from '../conta/conta.service';

@Module({
  providers: [ClienteService, ContaService],
  controllers: [ClienteController],
})
export class ClienteModule { }