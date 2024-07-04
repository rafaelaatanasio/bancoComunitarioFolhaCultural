import { Module } from '@nestjs/common';
import { ClientesModule } from './module/cliente/cliente.module';
import { ContasModule } from './module/conta/conta.module';
import { GerentesModule } from './module/gerente/gerente.module';

@Module({
  imports: [ClientesModule, ContasModule, GerentesModule],
})
export class AppModule {}
