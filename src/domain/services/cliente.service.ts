import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/domain/entities/cliente.entity';

@Injectable()
export class ClientesService {
    private clientes: Cliente[] = [];

    criarCliente(nome: string, id: string, endereco: string, telefone: string, rendaSalarial: number): Cliente {
        const novoCliente: Cliente = new Cliente(nome, id, endereco, telefone, rendaSalarial);
        this.clientes.push(novoCliente);
        return novoCliente;
    }

    buscarClientePorId(id: string): Cliente | undefined {
        return this.clientes.find(cliente => cliente.id === id);
    }

    listarClientes(): Cliente[] {
        return this.clientes;
    }

    removerCliente(id: string): void {
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    }
}
