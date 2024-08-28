import { Module } from '@nestjs/common';
import { ClientesService } from 'src/domain/services/cliente.service'; 
import { ClientesController } from 'src/application/controllers/cliente.controller';

@Module({
  providers: [ClientesService],
  controllers: [ClientesController],
  exports: [ClientesService],
})
export class ClienteModule {}
