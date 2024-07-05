import { Cliente } from './cliente';

export abstract class Conta {
    protected saldo: number = 0;

    constructor(public numero: number, public cliente: Cliente) { }

    numeroConta(valor: number): void {
        this.numero = valor;
    }

    saldoConta(): number {
        return this.saldo;
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    sacar(valor: number): void {
        if (this.saldo >= valor) {
            this.saldo -= valor;
        } else {
            throw new Error('Saldo insuficiente.');
        }
    }

    transferir(valor: number, contaDestino: Conta): void {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            contaDestino.depositar(valor);
        } else {
            throw new Error('Saldo insuficiente.');
        }
    }

    consultarSaldo(): number {
        return this.saldo;
    }
}
