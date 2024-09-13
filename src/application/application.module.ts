import { Module } from '@nestjs/common';
import { ContasController } from './controllers/conta.controller';
import { ClientesController } from './controllers/cliente.controller';
import { GerentesController } from './controllers/gerente.controller';
import { DomainModule } from 'src/domain/domain.module';

@Module({
    imports: [DomainModule],
    controllers: [ContasController, ClientesController, GerentesController],
    providers: [],
    exports: [],
})
export class ApplicationModule { }
