import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cliente, ClienteService } from './cliente.service';
import { ContaBancaria } from 'src/conta/conta.service';

@Controller('clientes')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    adicionarCliente(@Body() cliente: Cliente): void {
        this.clienteService.adicionarCliente(cliente);
    }

    @Post(':id/conta')
    abrirConta(
        @Param('id') id: string,
        @Body() conta: ContaBancaria,
    ): void {
        const cliente = this.clienteService.obterClientePorId(id);
        this.clienteService.abrirConta(cliente, conta);
    }

    @Get(':id')
    obterClientePorId(@Param('id') id: string): Cliente {
        return this.clienteService.obterClientePorId(id);
    }
}