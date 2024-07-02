import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/cliente/cliente.service';
import { ContaBancaria, ContaCorrente, ContaPoupanca } from 'src/conta/conta.service';

@Injectable()
export class GerenteService {
    private gerentes: Gerente[] = [];

    adicionarGerente(gerente: Gerente): Gerente {
        this.gerentes.push(gerente);
        return gerente;
    }

    obterGerentePorId(id: string): Gerente {
        return this.gerentes.find(gerente => gerente.id === id);
    }

    obterClientePorId(gerente: Gerente, clienteId: string): Cliente {
        return gerente.clientes.find(cliente => cliente.id === clienteId);
    }

    adicionarCliente(gerente: Gerente, cliente: Cliente): void {
        gerente.clientes.push(cliente);
    }

    adicionarClientePorId(gerente: Gerente, clienteId: string): Cliente {
        return gerente.clientes.find(cliente => cliente.id === clienteId);
    }

    removerCliente(gerente: Gerente, cliente: Cliente): void {
        gerente.clientes = gerente.clientes.filter(c => c !== cliente);
    }

    abrirConta(gerente: Gerente, cliente: Cliente, tipoConta: string): void {
        let conta;
        if (tipoConta === 'ContaCorrente') {
            conta = new ContaCorrente(0, cliente.id, 1000);
        } else if (tipoConta === 'ContaPoupanca') {
            conta = new ContaPoupanca(0, cliente.id, 0.05);
        }
        cliente.contas.push(conta);
    }

    fecharConta(gerente: Gerente, cliente: Cliente, conta: ContaBancaria): void {
        cliente.contas = cliente.contas.filter(c => c !== conta);
    }

    mudarTipoConta(gerente: Gerente, cliente: Cliente, conta: ContaBancaria, novoTipo: string): void {
        conta.tipo = novoTipo;
    }
}

export class Gerente {
    constructor(
        public nomeCompleto: string,
        public id: string,
        public clientes: Cliente[] = [],
    ) {
        this.nomeCompleto = nomeCompleto;
        this.id = uuidv4();
        this.clientes = clientes;
    }
}

function uuidv4(): string {
    throw new Error('Função não implementada.');
}
