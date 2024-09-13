import { Module } from '@nestjs/common';
import { ClientesService } from './services/cliente.service';
import { ContasService } from './services/conta.service';
import { GerentesService } from './services/gerente.service';
import { PagamentoService } from './services/pagamento.service';

@Module({
    imports: [],
    providers: [ClientesService, ContasService, GerentesService, PagamentoService],
    exports: [ClientesService, ContasService, GerentesService, PagamentoService],
})
export class DomainModule { }
