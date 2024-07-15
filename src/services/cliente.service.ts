import { Injectable } from '@nestjs/common';
import { Cliente } from '../../classes/cliente';

@Injectable()
export class ClientesService {
    private clientes: Cliente[] = [];

    criarCliente(nome: string, id: number, endereco: string, telefone: string, rendaSalarial: number): Cliente {
        const cliente = new Cliente(nome, id, endereco, telefone, rendaSalarial);
        this.clientes.push(cliente);
        return cliente;
    }

    buscarClientePorId(id: number): Cliente {
        return this.clientes.find(cliente => cliente.id === id);
    }

    removerCliente(id: number): void {
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
    }
}
