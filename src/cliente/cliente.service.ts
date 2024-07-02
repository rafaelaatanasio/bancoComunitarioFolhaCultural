import { Injectable } from '@nestjs/common';
import { ContaBancaria } from '../conta/conta.service';
import { Gerente } from '../gerente/gerente.service';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [];

    adicionarCliente(cliente: Cliente): Cliente {
        this.clientes.push(cliente);
        return cliente;
    }

    obterClientes(): Cliente[] {
        return this.clientes;
    }

    obterClientePorId(id: string): Cliente {
        return this.clientes.find(cliente => cliente.id === id);
    }

    abrirConta(cliente: Cliente, conta: ContaBancaria): void {
        cliente.contas.push(conta);
    }

    fecharConta(cliente: Cliente, conta: ContaBancaria): void {
        cliente.contas = cliente.contas.filter(c => c !== conta);
    }

    mudarTipoConta(cliente: Cliente, conta: ContaBancaria, novoTipo: string): void {
        conta.tipo = novoTipo;
    }
}

export class Cliente {
    constructor(
        public nomeCompleto: string,
        public id: string,
        public endereco: string,
        public telefone: string,
        public contas: ContaBancaria[] = [],
        public gerente: Gerente,
    ) {
        this.nomeCompleto = nomeCompleto;
        this.id = uuidv4();
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
        this.gerente = gerente
    }
}

function uuidv4(): string {
    throw new Error('Função não implementada');
}
