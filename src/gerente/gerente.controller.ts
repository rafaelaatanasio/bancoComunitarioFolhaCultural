import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { GerenteService, Gerente } from './gerente.service';
import { Cliente } from '../cliente/cliente.service';

@Controller('gerentes')
export class GerenteController {
    constructor(private readonly gerenteService: GerenteService) { }

    @Post()
    adicionarGerente(@Body() gerente: Gerente): void {
        this.gerenteService.adicionarGerente(gerente);
    }

    @Post(':id/cliente')
    adicionarCliente(
        @Param('id') id: string,
        @Body() cliente: Cliente,
    ): void {
        const gerente = this.gerenteService.obterGerentePorId(id);
        this.gerenteService.adicionarCliente(gerente, cliente);
    }

    @Post(':id/cliente/:clienteId/conta')
    abrirConta(
        @Param('id') id: string,
        @Param('clienteId') clienteId: string,
        @Body('tipoConta') tipoConta: string,
    ): void {
        const gerente = this.gerenteService.obterGerentePorId(id);
        const cliente = this.gerenteService.obterClientePorId(gerente, clienteId);
        this.gerenteService.abrirConta(gerente, cliente, tipoConta);
    }

    @Get(':id')
    obterGerentePorId(@Param('id') id: string): Gerente {
        return this.gerenteService.obterGerentePorId(id);
    }
}