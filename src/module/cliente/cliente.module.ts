import { Module } from '@nestjs/common';
import { ClientesService } from './cliente.service';
import { ClientesController } from './cliente.controller';

@Module({
  providers: [ClientesService],
  controllers: [ClientesController],
  exports: [ClientesService]
})
export class ClientesModule { }
