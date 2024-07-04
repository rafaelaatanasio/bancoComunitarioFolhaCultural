import { Controller, Post, Body, Param } from '@nestjs/common';
import { ContasService } from './conta.service';
import { Conta } from '../../classes/conta';

@Controller('contas')
export class ContasController {
    constructor(private readonly contasService: ContasService) { }

    @Post()
    criarConta(
        @Body('clienteId') clienteId: number,
        @Body('tipo') tipo: 'corrente' | 'poupanca'
    ): Conta {
        return this.contasService.criarConta(clienteId, tipo);
    }
}
