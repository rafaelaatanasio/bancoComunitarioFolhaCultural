import { Module } from '@nestjs/common';
import { GerenteService } from './gerente.service';
import { GerenteController } from './gerente.controller';
import { ClienteModule } from '../cliente/cliente.module';
import { ContaService } from '../conta/conta.service';

@Module({
  imports: [ClienteModule],
  providers: [GerenteService, ContaService],
  controllers: [GerenteController],
})
export class GerenteModule {}
