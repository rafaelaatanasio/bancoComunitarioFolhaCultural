import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { GerenteModule } from './gerente/gerente.module';

@Module({
  imports: [ClienteModule, GerenteModule],
})
export class AppModule {}
