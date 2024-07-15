import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ClientesService } from '../module/cliente/cliente.service';
import { Cliente } from '../classes/cliente';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) { }

    @Post()
    criarCliente(
        @Body('nome') nome: string,
        @Body('id') id: number,
        @Body('endereco') endereco: string,
        @Body('telefone') telefone: string,
        @Body('rendaSalarial') rendaSalarial: number
    ): Cliente {
        return this.clientesService.criarCliente(nome, id, endereco, telefone, rendaSalarial);
    }

    @Get(':id')
    buscarCliente(@Param('id') id: number): Cliente {
        return this.clientesService.buscarClientePorId(id);
    }

    @Delete(':id')
    removerCliente(@Param('id') id: number): void {
        this.clientesService.removerCliente(id);
    }
}
