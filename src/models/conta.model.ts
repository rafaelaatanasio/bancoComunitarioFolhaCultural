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
