import { Module } from '@nestjs/common';
import { GerentesService } from '../services/gerente.service';
import { GerentesController } from '../controllers/gerente.controller';
import { ClientesModule } from './cliente.model';

@Module({
  imports: [ClientesModule],
  providers: [GerentesService],
  controllers: [GerentesController]
})
export class GerentesModule { }
