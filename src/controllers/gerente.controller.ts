import { Controller, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { GerentesService } from '../services/gerente.service';
import { Gerente } from 'src/modules/gerente.module';
import { Cliente } from 'src/modules/cliente.module';
import { Conta } from 'src/modules/conta.module';

@Controller('gerentes')
export class GerentesController {
    constructor(private readonly gerentesService: GerentesService) { }

    @Post()
    criarGerente(
        @Body('nome') nome: string,
        @Body('id') id: number
    ): Gerente {
        return this.gerentesService.criarGerente(nome, id);
    }

    @Post(':gerenteId/clientes')
    adicionarCliente(
        @Param('gerenteId') gerenteId: number,
        @Body() cliente: Cliente
    ): void {
        this.gerentesService.adicionarCliente(gerenteId, cliente);
    }

    @Delete(':gerenteId/clientes/:clienteId')
    removerCliente(
        @Param('gerenteId') gerenteId: number,
        @Param('clienteId') clienteId: number
    ): void {
        this.gerentesService.removerCliente(gerenteId, clienteId);
    }

    @Post(':gerenteId/contas')
    abrirConta(
        @Param('gerenteId') gerenteId: number,
        @Body('tipo') tipo: 'corrente' | 'poupanca',
        @Body('clienteId') clienteId: number
    ): Conta {
        return this.gerentesService.abrirConta(gerenteId, tipo, clienteId);
    }

    @Delete(':gerenteId/contas/:clienteId/:contaNumero')
    fecharConta(
        @Param('gerenteId') gerenteId: number,
        @Param('clienteId') clienteId: number,
        @Param('contaNumero') contaNumero: number
    ): void {
        this.gerentesService.fecharConta(gerenteId, clienteId, contaNumero);
    }

    @Patch(':gerenteId/contas/:clienteId/:contaNumero')
    modificarTipoConta(
        @Param('gerenteId') gerenteId: number,
        @Param('clienteId') clienteId: number,
        @Param('contaNumero') contaNumero: number,
        @Body('novoTipo') novoTipo: 'corrente' | 'poupanca'
    ): Conta {
        return this.gerentesService.modificarTipoConta(gerenteId, clienteId, contaNumero, novoTipo);
    }
}
