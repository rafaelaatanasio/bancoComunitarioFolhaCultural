import { Conta } from './conta';
import { Cliente } from './cliente';
import { NovaConta } from 'src/interface/novaConta';

export class ContaCorrente extends Conta {
    private limiteChequeEspecial: number = 100;

    constructor(numero: number, cliente: Cliente) {
        super(numero, cliente);
    }

    sacar(valor: number): void {
        if (this.saldo + this.limiteChequeEspecial >= valor) {
            this.saldo -= valor;
            console.log(`Sacado: R$${valor}. Saldo atual: R$${this.saldo}`);
        } else {
            console.log('Saldo insuficiente.');
        }
    }

    depositar(valor: number): void {
        super.depositar(valor);
    }

    transferir(valor: number, contaDestino: NovaConta): void {
        super.transferir(valor, contaDestino);
    }

    consultarSaldo(): number {
        return super.consultarSaldo();
    }

    numeroConta(valor: number): void {
        super.numeroConta(valor);
    }

    saldoConta(): number {
        return super.saldoConta();
    }
}
