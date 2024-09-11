import { Cliente } from "./cliente.entity";
import { ContaCorrente } from "./contaCorrente.entity";
import { ContaPoupanca } from "./contaPoupanca.entity";
import { TipoConta } from 'src/domain/enums/tipoConta.enum';
import { NovaConta } from "src/domain/interfaces/novaConta.interface";

export abstract class Conta implements NovaConta {
  protected saldo: number = 0;
  public numero: number;
  public cliente: Cliente

  constructor(
    numero: number,
    cliente: Cliente
  ) {
    this.numero = numero;
    this.cliente = cliente
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

export abstract class ContaFactory {
  abstract criarConta(tipo: TipoConta, cliente: Cliente): NovaConta;
}

export class ConcreteContaFactory extends ContaFactory {
  criarConta(tipo: TipoConta, cliente: Cliente): NovaConta {
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
export { ContaCorrente, ContaPoupanca };

