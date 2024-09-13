import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../../domain/entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async criarCliente(nome: string, endereco: string, telefone: string, rendaSalarial: number): Promise<Cliente> {
    const novoCliente = this.clienteRepository.create({ nome, endereco, telefone, rendaSalarial });
    return this.clienteRepository.save(novoCliente);
  }

  async buscarClientePorId(id: string): Promise<Cliente | undefined> {
    return this.clienteRepository.findOne({ where: { id } });
  }

  async listarClientes(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async removerCliente(id: string): Promise<void> {
    const cliente = await this.buscarClientePorId(id);
    if (!cliente) throw new BadRequestException('Cliente não encontrado');
    await this.clienteRepository.remove(cliente);
  }
}
