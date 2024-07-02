import { Controller, Post, Body, Param, Get, HttpStatus, HttpException } from '@nestjs/common';
import { GerenteService, Gerente } from './gerente.service';
import { Cliente, ClienteService } from '../cliente/cliente.service';

@Controller('gerentes')
export class GerenteController {
    constructor(
        private readonly gerenteService: GerenteService,
        private readonly clienteService: ClienteService,
    ) { }

    @Post()
    adicionarGerente(@Body() gerente: Gerente) {
        const novoGerente = this.gerenteService.adicionarGerente(gerente);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Gerente criado com sucesso',
            data: novoGerente,
        }
    }

    @Post(':id/cliente')
    adicionarCliente(
        @Param('id') id: string,
        @Body() cliente: Cliente,
    ) {
        const gerente = this.gerenteService.obterGerentePorId(id);
        if (!gerente) {
            throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
        }
        const novoCliente = this.clienteService.adicionarCliente(cliente);
        this.gerenteService.adicionarCliente(gerente, novoCliente);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Cliente adicionado com sucesso',
            data: novoCliente,
        };
    }

    @Post(':id/cliente/:clienteId/conta')
    abrirConta(
        @Param('id') id: string,
        @Param('clienteId') clienteId: string,
        @Body('tipoConta') tipoConta: string,
    ) {
        const gerente = this.gerenteService.obterGerentePorId(id);
        const cliente = this.gerenteService.obterClientePorId(gerente, clienteId);
        if (!gerente || !cliente) {
            throw new HttpException('Gerente ou Cliente não encontrado', HttpStatus.NOT_FOUND);
        }
        this.gerenteService.abrirConta(gerente, cliente, tipoConta);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Conta aberta com sucesso',
            data: cliente,
        };
    }

    @Get(':id')
    obterGerentePorId(@Param('id') id: string) {
        const gerente = this.gerenteService.obterGerentePorId(id);
        if (!gerente) {
            throw new HttpException('Gerente não encontrado', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Gerente obtido com sucesso',
            data: gerente,
        };
    }
}
