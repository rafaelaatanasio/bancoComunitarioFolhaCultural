import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conta } from '../../domain/entities/conta.entity';
import { ContaCorrente } from '../../domain/entities/contaCorrente.entity';
import { ContaPoupanca } from '../../domain/entities/contaPoupanca.entity';
import { ClientesService } from './cliente.service';
import { Cliente } from '../../domain/entities/cliente.entity';
import { TipoConta } from '../../domain/enums/tipoConta.enum';

@Injectable()
export class ContasService {
  constructor(
    @InjectRepository(Conta)
    private readonly contaRepository: Repository<Conta>,
    private readonly clientesService: ClientesService
  ) {}

  async criarConta(clienteId: string, tipo: TipoConta): Promise<Conta> {
    const cliente = await this.clientesService.buscarClientePorId(clienteId);
    if (!cliente) throw new BadRequestException('Cliente não encontrado');

    let conta: Conta;
    const numeroConta = Math.floor(Math.random() * 1000000); // Gerar número aleatório para a conta

    if (tipo === TipoConta.Corrente) {
      if (cliente.rendaSalarial < 500) throw new BadRequestException('Renda insuficiente para abrir conta corrente');
      conta = new ContaCorrente(numeroConta, cliente);
    } else {
      conta = new ContaPoupanca(numeroConta, cliente);
    }

    cliente.contas.push(conta);
    await this.contaRepository.save(conta);
    return conta;
  }

  async depositar(clienteId: string, contaNumero: number, valor: number): Promise<void> {
    const conta = await this.buscarConta(clienteId, contaNumero);
    conta.depositar(valor);
    await this.contaRepository.save(conta);
  }

  async sacar(clienteId: string, contaNumero: number, valor: number): Promise<void> {
    const conta = await this.buscarConta(clienteId, contaNumero);
    conta.sacar(valor);
    await this.contaRepository.save(conta);
  }

  async transferir(clienteId: string, contaNumero: number, valor: number, contaDestinoNumero: number): Promise<void> {
    const conta = await this.buscarConta(clienteId, contaNumero);
    const contaDestino = await this.buscarConta(clienteId, contaDestinoNumero);
    conta.transferir(valor, contaDestino);
    await this.contaRepository.save(conta);
    await this.contaRepository.save(contaDestino);
  }

  public async buscarConta(clienteId: string, contaNumero: number): Promise<Conta> {
    const cliente = await this.clientesService.buscarClientePorId(clienteId);
    if (!cliente) throw new BadRequestException('Cliente não encontrado');

    const conta = cliente.contas.find(conta => conta.numero === contaNumero);
    if (!conta) throw new BadRequestException('Conta não encontrada');

    return conta;
  }
}
