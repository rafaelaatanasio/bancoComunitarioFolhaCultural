import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { ClientesService } from 'src/domain/services/cliente.service';
import { Cliente } from 'src/domain/entities/cliente.entity';
import { CreateClienteDto } from '../dtos/create-client.dto'; 

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  criarCliente(@Body() createClienteDto: CreateClienteDto): Cliente {
    const { nome, id, endereco, telefone, rendaSalarial } = createClienteDto;
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
