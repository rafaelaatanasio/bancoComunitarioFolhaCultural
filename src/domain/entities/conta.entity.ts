import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Cliente } from "./cliente.entity";
import { NovaConta } from 'src/domain/interfaces/novaConta.interface';

@Entity('contas')
export abstract class Conta implements NovaConta {
  @PrimaryGeneratedColumn('uuid')
  public id: string; // UUID como string

  @Column()
  public numero: number;

  @Column('decimal', { default: 0 })
  protected saldo: number; // Inicializado como 0

  @ManyToOne(() => Cliente, cliente => cliente.contas)
  public cliente: Cliente;

  constructor(
    numero: number,
    cliente: Cliente
  ) {
    this.numero = numero;
    this.cliente = cliente;
    this.saldo = 0; // Inicializar o saldo como 0
  }

  consultarSaldo(): number {
    return this.saldo;
  }

  numeroConta(valor: number): void {
    this.numero = valor;
  }

  depositar(valor: number): void {
    this.saldo += valor;
    console.log(`Depositado: R$${valor}. Saldo atual: R$${this.saldo}`);
  }

  sacar(valor: number): void {
    if (this.saldo >= valor) {
      this.saldo -= valor;
      console.log(`Sacado: R$${valor}. Saldo atual: R$${this.saldo}`);
    } else {
      console.log('Saldo insuficiente.');
    }
  }

  transferir(valor: number, contaDestino: NovaConta): void {
    if (this.saldo >= valor) {
      this.saldo -= valor;
      contaDestino.depositar(valor);
      console.log(`Transferido: R$${valor} para conta ${contaDestino.consultarSaldo()}. Saldo atual: R$${this.saldo}`);
    } else {
      console.log('Saldo insuficiente.');
    }
  }

  saldoConta(): number {
    return this.saldo;
  }
}
