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
  
    verificarSaldo(): number { // sem void, retorna o saldo
      return this.saldo;
    }
  
    transferir(destino: ContaBancaria, valor: number): void {
      this.sacar(valor); // primeiro saca e depois transfere pro destino
      destino.depositar(valor); // destino é um parâmetro do tipo ContaBancaria para transferir
    }
  }

  export class ContaCorrente extends ContaBancaria { // filha e mãe
    constructor(
        saldo: number,
        clienteId: string,
        public chequeEspecial: number,
    ){
        super ('ContaCorrente', saldo, clienteId);
    // chama o construtor da classe ContaBancaria com os parâmetros fornecidos.
    // A string 'ContaCorrente' é passada como um identificador de tipo de conta
    // (assumindo que o construtor de ContaBancaria aceita um tipo de conta como primeiro parâmetro).
    }
  }

  export class ContaPoupanca extends ContaBancaria{
    constructor(
        saldo: number,
        clienteId: string,
        public taxaJuros: number,
    ){
        super ('ContaPoupanca', saldo, clienteId);
  }

  calcularTaxa(): number {
    return this.saldo * this.taxaJuros;
  }
}