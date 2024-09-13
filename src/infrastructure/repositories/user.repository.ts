import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from 'src/domain/entities/cliente.entity';

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
    return this.findOne({ where: { id } });
  }
  
    findOne(arg0: { where: { id: string; }; }): Cliente | PromiseLike<Cliente> {
        throw new Error('Method not implemented.');
    }

  async listarClientes(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async removerCliente(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
