import { Cliente } from "./cliente";
import { Conta } from "./conta";
import { ContaCorrente } from "./contaCorrente";
import { ContaPoupanca } from "./contaPoupanca";

export class Gerente {
    constructor(
        public nome: string,
        public id: number,
        public clientes: Cliente[] = []
    ) { }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    removerCliente(clienteId: number): void {
        this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
    }

    abrirConta(tipo: 'corrente' | 'poupanca', cliente: Cliente): Conta {
        let novaConta: Conta;
        if (tipo === 'corrente') {
            novaConta = new ContaCorrente(cliente.id, cliente);
        } else {
            novaConta = new ContaPoupanca(cliente.id, cliente);
        }
        cliente.contas.push(novaConta);
        return novaConta;
    }

    fecharConta(cliente: Cliente, contaNumero: number): void {
        cliente.contas = cliente.contas.filter(conta => conta.numero !== contaNumero);
    }

    modificarTipoConta(cliente: Cliente, contaNumero: number, novoTipo: 'corrente' | 'poupanca'): Conta {
        const conta = cliente.contas.find(conta => conta.numero === contaNumero);
        if (!conta) throw new Error("Conta não encontrada.");

        this.fecharConta(cliente, contaNumero);
        return this.abrirConta(novoTipo, cliente);
    }
}
