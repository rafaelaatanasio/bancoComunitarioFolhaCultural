import { Conta } from './conta.module';
import { Cliente } from './cliente.module';

export class ContaCorrente extends Conta {
    private limiteChequeEspecial: number;

    constructor(numero: number, cliente: Cliente, limiteChequeEspecial: number = 0) {
        super(numero, cliente);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    getLimiteChequeEspecial(): number {
        return this.limiteChequeEspecial;
    }

    setLimiteChequeEspecial(limite: number): void {
        this.limiteChequeEspecial = limite;
    }
}
