import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Cliente } from "./cliente.entity";
import { Conta } from "./conta.entity";
import { ContaCorrente } from "./contaCorrente.entity";
import { ContaPoupanca } from "./contaPoupanca.entity";

@Entity('gerentes')
export class Gerente {
  @PrimaryGeneratedColumn('uuid')
  public id: string; // UUID como string

  @Column()
  public nome: string;

  @OneToMany(() => Cliente, cliente => cliente.gerente)
  public clientes: Cliente[];

  constructor(
    nome: string,
    clientes: Cliente[] = []
  ) {
    this.nome = nome;
    this.clientes = clientes;
  }

  adicionarCliente(cliente: Cliente): void {
    this.clientes.push(cliente);
  }

  removerCliente(clienteId: string): void {
    this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
  }

  abrirConta(tipo: 'corrente' | 'poupanca', cliente: Cliente): Conta {
    let novaConta: Conta;
    // Gera um número para a nova conta, você pode usar uma lógica específica para isso
    const numeroConta = Math.floor(Math.random() * 10000); // Exemplo simples

    if (tipo === 'corrente') {
      novaConta = new ContaCorrente(numeroConta, cliente);
    } else {
      novaConta = new ContaPoupanca(numeroConta, cliente);
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
