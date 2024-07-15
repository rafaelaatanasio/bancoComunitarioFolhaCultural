import { Module } from '@nestjs/common';
import { ClientesModule } from './models/cliente.model';
import { ContasModule } from './models/conta.model';
import { GerentesModule } from './models/gerente.model';

@Module({
  imports: [ClientesModule, ContasModule, GerentesModule],
})
export class AppModule {}
