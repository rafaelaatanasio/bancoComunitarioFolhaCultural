import { Conta } from './conta.model';
import { Cliente } from './cliente.model';

export class ContaCorrente extends Conta {
    private limiteChequeEspecial: number = 100;

    sacar(valor: number): void {
        if (this.saldo + this.limiteChequeEspecial >= valor) {
            this.saldo -= valor;
            console.log(`Sacado: R$${valor}. Saldo atual: R$${this.saldo}`);
        } else {
            console.log('Saldo insuficiente.');
        }
    }
}
