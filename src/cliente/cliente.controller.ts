import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Cliente, ClienteService } from './cliente.service';
import { ContaBancaria } from 'src/conta/conta.service';

@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    adicionarCliente(@Body() cliente: Cliente) {
        const novoCliente = this.clienteService.adicionarCliente(cliente);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Cliente criado com sucesso',
            data: novoCliente,
        };
    }

    @Post(':id/conta')
    abrirConta(
        @Param('id') id: string,
        @Body() conta: ContaBancaria,
    ) {
        const cliente = this.clienteService.obterClientePorId(id);
        if (!cliente) {
            throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
        }
        this.clienteService.abrirConta(cliente, conta);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Conta aberta com sucesso',
            data: cliente,
        };
    }

    @Get(':id')
    obterClientePorId(@Param('id') id: string) {
        const cliente = this.clienteService.obterClientePorId(id);
        if (!cliente) {
            throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Cliente obtido com sucesso',
            data: cliente,
        };
    }
}