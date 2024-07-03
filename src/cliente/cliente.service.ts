import { Injectable } from '@nestjs/common';
import { ContaBancaria } from '../conta/conta.service';
import { Gerente } from '../gerente/gerente.service';

@Injectable()
export class ClienteService {
    private clientes: Cliente[] = [];

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
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
    ) { }
}