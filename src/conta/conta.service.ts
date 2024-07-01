import { Injectable } from '@nestjs/common';

// criar/definir a classe conta
@Injectable()
export class ContaService {}

export class ContaBancaria {
    constructor(
      public tipo: string,
      public saldo: number,
      public clienteId: string,
    ) {}
  
    depositar(valor: number): void {
      this.saldo += valor;
    }
  
    sacar(valor: number): void {
      if (valor <= this.saldo) {
        this.saldo -= valor;
      } else {
        throw new Error('Saldo insuficiente');
      }
    }
  
    verificarSaldo(): number {
      return this.saldo;
    }
  
    transferir(destino: ContaBancaria, valor: number): void {
      this.sacar(valor);
      destino.depositar(valor);
    }
  }