import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../../domain/entities/gerente.entity';
import { Cliente } from '../../domain/entities/cliente.entity';
import { Conta } from '../../domain/entities/conta.entity';
import { TipoConta } from '../../domain/enums/tipoConta.enum';
import { ConcreteContaFactory } from '../factories/contaFactory';
//import { ConcreteContaFactory } from '.src/domain/entities/conta.entity'; // Ajuste o caminho conforme a estrutura do seu projeto

@Injectable()
export class GerentesService {
  constructor(
    @InjectRepository(Gerente)
    private readonly gerenteRepository: Repository<Gerente>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ) {}

  async criarGerente(nome: string): Promise<Gerente> {
    const gerente = this.gerenteRepository.create({ nome });
    return this.gerenteRepository.save(gerente);
  }

  async buscarGerentePorId(id: string): Promise<Gerente> {
    return this.gerenteRepository.findOne({ where: { id } });
  }

  private async buscarCliente(gerenteId: string, clienteId: string): Promise<Cliente> {
    const gerente = await this.buscarGerentePorId(gerenteId);
    const cliente = gerente.clientes.find(cliente => cliente.id === clienteId);
    if (!cliente) throw new BadRequestException('Cliente não encontrado');
    return cliente;
  }

  async adicionarCliente(gerenteId: string, cliente: Cliente): Promise<void> {
    const gerente = await this.buscarGerentePorId(gerenteId);
    gerente.adicionarCliente(cliente);
    await this.gerenteRepository.save(gerente);
  }

  async removerCliente(gerenteId: string, clienteId: string): Promise<void> {
    const cliente = await this.buscarCliente(gerenteId, clienteId);
    const gerente = await this.buscarGerentePorId(gerenteId);
    gerente.removerCliente(clienteId);
    await this.gerenteRepository.save(gerente);
  }

  async abrirConta(gerenteId: string, tipo: TipoConta, clienteId: string): Promise<Conta> {
    const cliente = await this.buscarCliente(gerenteId, clienteId);
    const factory = new ConcreteContaFactory();
    const novaConta = factory.criarConta(tipo, cliente);
    cliente.contas.push(novaConta);
    await this.clienteRepository.save(cliente);
    return novaConta;
  }

  async fecharConta(gerenteId: string, clienteId: string, contaNumero: number): Promise<void> {
    const cliente = await this.buscarCliente(gerenteId, clienteId);
    const gerente = await this.buscarGerentePorId(gerenteId);
    gerente.fecharConta(cliente, contaNumero);
    await this.gerenteRepository.save(gerente);
  }

  async modificarTipoConta(gerenteId: string, clienteId: string, contaNumero: number, novoTipo: TipoConta): Promise<Conta> {
    const cliente = await this.buscarCliente(gerenteId, clienteId);
    const gerente = await this.buscarGerentePorId(gerenteId);
    return gerente.modificarTipoConta(cliente, contaNumero, novoTipo);
  }
}
