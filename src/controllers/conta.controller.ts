import { Controller, Post, Body, Param, Get, BadRequestException } from '@nestjs/common';
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
        @Body('clienteIdOrigem') clienteIdOrigem: number,
        @Body('contaNumeroOrigem') contaNumeroOrigem: number,
        @Body('clienteIdDestino') clienteIdDestino: number,
        @Body('contaNumeroDestino') contaNumeroDestino: number,
        @Body('valor') valor: number
    ): void {
        this.contasService.transferir(clienteIdOrigem, contaNumeroOrigem, clienteIdDestino, contaNumeroDestino, valor);
    }

    @Get(':clienteId/:contaNumero/saldo')
    consultarSaldo(
        @Param('clienteId') clienteId: number,
        @Param('contaNumero') contaNumero: number
    ): number {
        const conta = this.contasService.buscarConta(clienteId, contaNumero);
        if (!conta) throw new BadRequestException('Conta não encontrada');
        return conta.consultarSaldo();
    }
}
