import { Module } from '@nestjs/common';
import { ClientesModule } from './module/cliente.module';
import { ContasModule } from './module/conta.module';
import { GerentesModule } from './module/gerente.module';

@Module({
  imports: [ClientesModule, ContasModule, GerentesModule],
})
export class AppModule {}
