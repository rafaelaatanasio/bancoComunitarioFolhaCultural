import { BadRequestException } from "@nestjs/common";
import { Cliente } from "./cliente.module";
import { ContaCorrente } from "./contaCorrente.module";
import { ContaPoupanca } from "./contaPoupanca.module";

export abstract class Conta {
  protected saldo: number = 0;

  constructor(
      public numero: number,
      public cliente: Cliente
  ) { }

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

  transferir(valor: number, contaDestino: Conta): void {
      if (this.saldo >= valor) {
          this.saldo -= valor;
          contaDestino.depositar(valor);
          console.log(`Transferido: R$${valor} para conta ${contaDestino.numero}. Saldo atual: R$${this.saldo}`);
      } else {
          console.log('Saldo insuficiente.');
      }
  }

  consultarSaldo(): number {
      return this.saldo;
  }
}

export enum TipoConta {
    Corrente = 'corrente',
    Poupanca = 'poupanca',
}

export abstract class ContaFactory {
    abstract criarConta(tipo: TipoConta, cliente: Cliente): Conta;
  }

export class ConcreteContaFactory extends ContaFactory {
    criarConta(tipo: TipoConta, cliente: Cliente): Conta {
      switch (tipo) {
        case TipoConta.Corrente:
          return new ContaCorrente(cliente.id, cliente);
        case TipoConta.Poupanca:
          return new ContaPoupanca(cliente.id, cliente);
        default:
          throw new Error('Tipo de conta não suportado.');
      }
    }
  }
