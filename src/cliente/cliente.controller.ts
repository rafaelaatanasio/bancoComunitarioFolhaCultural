import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cliente, ClienteService } from './cliente.service';
import { ContaBancaria } from 'src/conta/conta.service';

// Decorator é uma função especial. Adicionar metadados, modificar comportamentos ou adicionar funcionalidades adicionais
@Controller('clientes') // é um controlador e que irá gerenciar as rotas relacionadas a clientes
// indica que todas as rotas dentro desta classe estarão sob o caminho base
export class ClienteController {
    constructor(private readonly clienteService: ClienteService){} // imutável

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

// No arquivo de controlador (*.controller.ts), defina as rotas HTTP para interagir
// com as funcionalidades implementadas nos serviços.