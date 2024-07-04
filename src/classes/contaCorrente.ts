import { Conta } from './conta';
import { Cliente } from './cliente';
import { ContaPoupanca } from './contaPoupanca';

export class ContaCorrente extends Conta {
    private limiteChequeEspecial: number = 100;

    constructor(numero: number, cliente: Cliente) {
        super(numero, cliente);
    }

    sacar(valor: number): void {
        if (this.saldo + this.limiteChequeEspecial >= valor) {
            this.saldo -= valor;
        } else {
            throw new Error('Saldo insuficiente.');
        }
    }

    transferir(valor: number, contaDestino: Conta): void {
        if (contaDestino instanceof ContaCorrente || contaDestino instanceof ContaPoupanca) {
            super.transferir(valor, contaDestino);
        } else {
            throw new Error('Conta destino inválida.');
        }
    }
}
