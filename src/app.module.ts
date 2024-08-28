import { Module } from '@nestjs/common';
import { ClientesModule } from './modules/cliente.module';
import { ContasModule } from './modules/conta.module';
import { GerentesModule } from './modules/gerente.module';

@Module({
  imports: [ClientesModule, ContasModule, GerentesModule],
})
export class AppModule {}
