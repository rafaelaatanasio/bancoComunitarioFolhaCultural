import { Module } from '@nestjs/common';
import { GerentesService } from './gerente.service';
import { GerentesController } from './gerente.controller';
import { ClientesModule } from '../cliente/cliente.module';

@Module({
  imports: [ClientesModule],
  providers: [GerentesService],
  controllers: [GerentesController]
})
export class GerentesModule { }
