import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/module/cliente.module'; 

@Injectable()
export class ClientesService {
    removerCliente(id: number) {
        throw new Error('Method not implemented.');
    }
    private clientes: Cliente[] = [];

    criarCliente(nome: string, id: number, endereco: string, telefone: string, rendaSalarial: number): Cliente {
        const novoCliente: Cliente = new Cliente(nome, id, endereco, telefone, rendaSalarial);
        this.clientes.push(novoCliente);
        return novoCliente;
    }

    buscarClientePorId(id: number): Cliente | undefined {
        return this.clientes.find(cliente => cliente.id === id);
    }

    listarClientes(): Cliente[] {
        return this.clientes;
    }
}
