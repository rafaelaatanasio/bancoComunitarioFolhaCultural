import { Controller, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { GerentesService } from '../../domain/services/gerente.service';
import { Gerente } from 'src/domain/entities/gerente.entity';
import { Conta } from 'src/domain/entities/conta.entity';
import { GerenteDto } from '../dtos/gerente.dto';
import { Cliente } from 'src/domain/entities/cliente.entity';

@Controller('gerentes')
export class GerentesController {
  constructor(private readonly gerentesService: GerentesService) { }

  @Post()
  criarGerente(@Body() gerenteDto: GerenteDto): Gerente {
    const { nome, id } = gerenteDto;
    return this.gerentesService.criarGerente(nome, id);
  }

  @Post(':gerenteId/clientes')
  adicionarCliente(@Param('gerenteId') gerenteId: number, @Body() gerenteDto: GerenteDto): void {
    const cliente: Cliente = {
      id: gerenteDto.clienteId,
      nome: gerenteDto.clienteNome,
      endereco: gerenteDto.endereco,
      telefone: gerenteDto.telefone,
      rendaSalarial: gerenteDto.rendaSalarial,
      contas: gerenteDto.contas || [],
    };

    this.gerentesService.adicionarCliente(gerenteId, cliente);
  }

  @Delete(':gerenteId/clientes/:clienteId')
  removerCliente(@Param('gerenteId') gerenteId: number, @Param('clienteId') clienteId: number): void {
    this.gerentesService.removerCliente(gerenteId, clienteId);
  }

  @Post(':gerenteId/contas')
  abrirConta(@Param('gerenteId') gerenteId: number, @Body() gerenteDto: GerenteDto): Conta {
    const { tipo, clienteId } = gerenteDto;
    return this.gerentesService.abrirConta(gerenteId, tipo, clienteId);
  }

  @Patch(':gerenteId/contas/:clienteId/:contaNumero')
  modificarTipoConta(
    @Param('gerenteId') gerenteId: number,
    @Param('clienteId') clienteId: number,
    @Param('contaNumero') contaNumero: number,
    @Body() gerenteDto: GerenteDto
  ): Conta {
    return this.gerentesService.modificarTipoConta(
      gerenteId,
      clienteId,
      contaNumero,
      gerenteDto.novoTipo
    );
  }

  @Delete(':gerenteId/contas/:clienteId/:contaNumero')
  fecharConta(
    @Param('gerenteId') gerenteId: number,
    @Param('clienteId') clienteId: number,
    @Param('contaNumero') contaNumero: number
  ): void {
    this.gerentesService.fecharConta(gerenteId, clienteId, contaNumero);
  }
}
