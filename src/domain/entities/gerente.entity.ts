import { Cliente } from "./cliente.entity";
import { Conta } from "./conta.entity";
import { ContaCorrente } from "./contaCorrente.entity";
import { ContaPoupanca } from "./contaPoupanca.entity";

export class Gerente {
        public nome: string;
        public id: number;
        public clientes: Cliente[] = []

    constructor(
        nome: string,
        id: number,
        clientes: Cliente[] = []
    ) { 
        this.nome = nome,
        this.id = id,
        this.clientes = clientes = []
}

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