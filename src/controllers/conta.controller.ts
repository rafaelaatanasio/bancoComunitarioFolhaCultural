import { Controller, Post, Body, Param } from '@nestjs/common';
import { ContasService } from '../services/conta.service';
import { PagamentoService } from '../services/pagamento.service';
import { Conta } from '../modules/conta.module';

@Controller('contas')
export class ContasController {
    constructor(
        private readonly contasService: ContasService,
        private readonly pagamentoService: PagamentoService
    ) { }

    @Post()
    criarConta(
        @Body('clienteId') clienteId: number,
        @Body('tipo') tipo: 'corrente' | 'poupanca'
    ): Conta {
        return this.contasService.criarConta(clienteId, tipo);
    }

    @Post('depositar')
    depositar(
        @Body('clienteId') clienteId: number,
        @Body('contaNumero') contaNumero: number,
        @Body('valor') valor: number
    ): void {
        this.contasService.depositar(clienteId, contaNumero, valor);
    }

    @Post('sacar')
    sacar(
        @Body('clienteId') clienteId: number,
        @Body('contaNumero') contaNumero: number,
        @Body('valor') valor: number
    ): void {
        this.contasService.sacar(clienteId, contaNumero, valor);
    }

    @Post('transferir')
    transferir(
        @Body('clienteId') clienteId: number,
        @Body('contaNumero') contaNumero: number,
        @Body('valor') valor: number,
        @Body('contaDestinoId') contaDestinoId: number,
        @Body('contaDestinoNumero') contaDestinoNumero: number
    ): void {
        this.contasService.transferir(clienteId, contaNumero, valor, contaDestinoId, contaDestinoNumero);
    }

    @Post('pagar')
    pagar(
        @Body('clienteId') clienteId: number,
        @Body('contaNumero') contaNumero: number,
        @Body('valor') valor: number
    ): void {
        this.pagamentoService.realizarPagamento(clienteId, contaNumero, valor);
    }
}
